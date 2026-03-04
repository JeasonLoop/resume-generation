import { useState, useEffect, useCallback } from 'react';
import useResumeStore from '../../store/useResumeStore';
import axios from '../../utils/axios';
import {
  Sparkles, X, Loader2, ArrowRight, ChevronDown, Wand2,
  MessageSquare, Replace, ClipboardPaste, Settings, Eye, EyeOff,
  AlertTriangle, CheckCircle, Key,
} from 'lucide-react';

const INDUSTRIES = [
  { value: '', label: '通用' },
  { value: '互联网/科技', label: '互联网/科技' },
  { value: '金融', label: '金融' },
  { value: '教育', label: '教育' },
  { value: '医疗', label: '医疗' },
  { value: '制造业', label: '制造业' },
  { value: '设计/创意', label: '设计/创意' },
  { value: '市场/运营', label: '市场/运营' },
  { value: '法律', label: '法律' },
];

const MODES = [
  { id: 'optimize', label: '优化内容', icon: Wand2, desc: '润色并增强已有内容' },
  { id: 'suggest', label: 'AI 建议', icon: MessageSquare, desc: '根据指令生成新内容' },
];

const PROVIDERS = [
  { id: 'siliconflow', name: 'SiliconFlow', baseUrl: 'https://api.siliconflow.cn/v1', models: ['THUDM/GLM-Z1-9B-0414', 'Qwen/Qwen2.5-7B-Instruct', 'deepseek-ai/DeepSeek-R1-0528', 'Pro/deepseek-ai/DeepSeek-V3'], keyHint: 'sk-...' },
  { id: 'deepseek', name: 'DeepSeek', baseUrl: 'https://api.deepseek.com/v1', models: ['deepseek-chat', 'deepseek-reasoner'], keyHint: 'sk-...' },
  { id: 'openai', name: 'OpenAI', baseUrl: 'https://api.openai.com/v1', models: ['gpt-4o-mini', 'gpt-4o', 'gpt-4.1-mini', 'gpt-4.1-nano'], keyHint: 'sk-...' },
  { id: 'zhipu', name: '智谱 AI', baseUrl: 'https://open.bigmodel.cn/api/paas/v4', models: ['glm-4-flash', 'glm-4-plus', 'glm-4-long'], keyHint: '以 . 分隔的 Key' },
  { id: 'doubao', name: '豆包 (火山)', baseUrl: 'https://ark.cn-beijing.volces.com/api/v3', models: ['doubao-1-5-lite-32k', 'doubao-1-5-pro-32k'], keyHint: 'ARK Key' },
  { id: 'qwen', name: '通义千问', baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1', models: ['qwen-turbo', 'qwen-plus', 'qwen-max'], keyHint: 'sk-...' },
  { id: 'moonshot', name: 'Moonshot', baseUrl: 'https://api.moonshot.cn/v1', models: ['moonshot-v1-8k', 'moonshot-v1-32k'], keyHint: 'sk-...' },
  { id: 'custom', name: '自定义', baseUrl: '', models: [], keyHint: 'sk-...' },
];

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [input, setInput] = useState('');
  const [industry, setIndustry] = useState('');
  const [mode, setMode] = useState('optimize');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { resume, editorSelection, replaceSelection, updateContent } = useResumeStore();

  const [aiStatus, setAiStatus] = useState({ remaining: null, limit: 20, hasCustomKey: false });
  const [configForm, setConfigForm] = useState({ apiKey: '', baseUrl: '', model: '', provider: 'siliconflow' });
  const [showKey, setShowKey] = useState(false);
  const [configSaving, setConfigSaving] = useState(false);
  const [configMsg, setConfigMsg] = useState(null);

  const hasSelection = editorSelection.text.length > 0;

  const fetchStatus = useCallback(async () => {
    try {
      const res = await axios.get('/ai/status');
      const d = res.data.data;
      setAiStatus({
        remaining: d.remaining,
        limit: d.limit,
        hasCustomKey: d.hasCustomKey,
        usageCount: d.usageCount,
      });
      const savedUrl = d.customBaseUrl || '';
      const matched = PROVIDERS.find(p => p.id !== 'custom' && savedUrl === p.baseUrl);
      setConfigForm({
        apiKey: '',
        baseUrl: savedUrl,
        model: d.customModel || '',
        provider: matched?.id || (savedUrl ? 'custom' : 'siliconflow'),
      });
    } catch { /* silent */ }
  }, []);

  useEffect(() => {
    if (isOpen) fetchStatus();
  }, [isOpen, fetchStatus]);

  const handleGenerate = async () => {
    const content = mode === 'optimize'
      ? (hasSelection ? editorSelection.text : input)
      : input;

    if (!content.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      if (mode === 'optimize') {
        const response = await axios.post('/ai/optimize', {
          content,
          type: 'general',
          industry: industry || undefined,
        });
        setResult(response.data.data.optimized);
        if (response.data.data.remaining != null) {
          setAiStatus(prev => ({ ...prev, remaining: response.data.data.remaining }));
        }
      } else {
        const context = resume?.content_markdown
          ? resume.content_markdown.substring(0, 500)
          : '';
        const response = await axios.post('/ai/suggest', {
          prompt: content,
          context,
        });
        setResult(response.data.data.suggestion);
        if (response.data.data.remaining != null) {
          setAiStatus(prev => ({ ...prev, remaining: response.data.data.remaining }));
        }
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'AI 服务暂时不可用';
      setError(msg);
      if (err.response?.data?.code === 10003) {
        setAiStatus(prev => ({ ...prev, remaining: 0 }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyReplace = () => {
    if (!result) return;
    replaceSelection(result);
    handleReset();
  };

  const handleApplyAppend = () => {
    if (!result || !resume) return;
    const newContent = (resume.content_markdown || '') + '\n\n' + result;
    updateContent(newContent);
    handleReset();
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setInput('');
    setIsOpen(false);
  };

  const handleUseSelection = () => {
    if (hasSelection) setInput(editorSelection.text);
  };

  const handleSaveConfig = async () => {
    setConfigSaving(true);
    setConfigMsg(null);
    try {
      const payload = {};
      if (configForm.apiKey) payload.apiKey = configForm.apiKey;
      payload.baseUrl = configForm.baseUrl;
      payload.model = configForm.model;

      const res = await axios.put('/ai/config', payload);
      const d = res.data.data;
      setAiStatus(prev => ({
        ...prev,
        hasCustomKey: d.hasCustomKey,
        remaining: d.remaining,
      }));
      setConfigForm(prev => ({ ...prev, apiKey: '' }));
      setConfigMsg({ type: 'success', text: d.hasCustomKey ? '已切换为自定义 API，无次数限制' : '已清除自定义配置' });
    } catch (err) {
      setConfigMsg({ type: 'error', text: err.response?.data?.message || '保存失败' });
    } finally {
      setConfigSaving(false);
    }
  };

  const handleClearConfig = async () => {
    setConfigSaving(true);
    setConfigMsg(null);
    try {
      const res = await axios.put('/ai/config', { apiKey: '', baseUrl: '', model: '' });
      const d = res.data.data;
      setAiStatus(prev => ({ ...prev, hasCustomKey: false, remaining: d.remaining }));
      setConfigForm({ apiKey: '', baseUrl: '', model: '', provider: 'siliconflow' });
      setConfigMsg({ type: 'success', text: '已恢复使用内置 AI 服务' });
    } catch (err) {
      setConfigMsg({ type: 'error', text: err.response?.data?.message || '操作失败' });
    } finally {
      setConfigSaving(false);
    }
  };

  const isLimited = !aiStatus.hasCustomKey && aiStatus.remaining === 0;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-12 right-12 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center z-50 transition-all hover:scale-110 active:scale-95 shadow-lg group"
        title="打开 AI 助手"
      >
        <span className="font-serif italic text-lg group-hover:hidden">Ai</span>
        <Sparkles className="h-4 w-4 hidden group-hover:block" strokeWidth={1.5} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-12 right-12 w-[420px] bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl z-50 flex flex-col font-sans animate-fade-in-up shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-black" strokeWidth={1.5} />
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-black">AI 助手</span>
          {aiStatus.hasCustomKey && (
            <span className="text-[9px] px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded font-medium">自定义</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setShowSettings(!showSettings); setConfigMsg(null); }}
            className={`p-1.5 rounded-lg transition-colors ${showSettings ? 'bg-gray-100 text-black' : 'text-gray-400 hover:text-black hover:bg-gray-100'}`}
            title="AI 配置"
          >
            <Settings className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => { setIsOpen(false); setResult(null); setError(null); setShowSettings(false); }}
            className="text-gray-400 hover:text-black transition-colors p-1.5 rounded-lg hover:bg-gray-100"
          >
            <X className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar">
        {/* Settings Panel */}
        {showSettings && (
          <div className="space-y-3 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <Key className="h-3 w-3 text-gray-400" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-medium">自定义 AI 配置</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              配置自己的 API Key 后无次数限制，支持任意兼容 OpenAI 格式的服务商。
            </p>

            {/* Provider Quick Select */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-1.5">服务商</label>
              <div className="flex flex-wrap gap-1.5">
                {PROVIDERS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setConfigForm(prev => ({
                        ...prev,
                        provider: p.id,
                        baseUrl: p.baseUrl,
                        model: p.models[0] || prev.model,
                      }));
                      setConfigMsg(null);
                    }}
                    className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                      configForm.provider === p.id
                        ? 'bg-black text-white'
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 border border-gray-150'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* API Key */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-1">API Key</label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={configForm.apiKey}
                  onChange={(e) => setConfigForm(prev => ({ ...prev, apiKey: e.target.value }))}
                  placeholder={aiStatus.hasCustomKey ? '已配置（输入新值可覆盖）' : (PROVIDERS.find(p => p.id === configForm.provider)?.keyHint || 'sk-...')}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-black transition-colors pr-9 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </button>
              </div>
            </div>

            {/* Model - dropdown when provider has models, free input otherwise */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-1">模型</label>
              {(() => {
                const currentProvider = PROVIDERS.find(p => p.id === configForm.provider);
                const models = currentProvider?.models || [];
                if (models.length > 0) {
                  return (
                    <div className="relative">
                      <select
                        value={models.includes(configForm.model) ? configForm.model : '__custom__'}
                        onChange={(e) => {
                          if (e.target.value !== '__custom__') {
                            setConfigForm(prev => ({ ...prev, model: e.target.value }));
                          }
                        }}
                        className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-black transition-colors cursor-pointer pr-8 font-mono"
                      >
                        {models.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                        {!models.includes(configForm.model) && configForm.model && (
                          <option value="__custom__">{configForm.model}（自定义）</option>
                        )}
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
                    </div>
                  );
                }
                return (
                  <input
                    type="text"
                    value={configForm.model}
                    onChange={(e) => setConfigForm(prev => ({ ...prev, model: e.target.value }))}
                    placeholder="输入模型名称，如 gpt-4o-mini"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-black transition-colors font-mono"
                  />
                );
              })()}
              {PROVIDERS.find(p => p.id === configForm.provider)?.models.length > 0 && (
                <input
                  type="text"
                  value={!PROVIDERS.find(p => p.id === configForm.provider)?.models.includes(configForm.model) ? configForm.model : ''}
                  onChange={(e) => setConfigForm(prev => ({ ...prev, model: e.target.value }))}
                  placeholder="或手动输入其他模型名称..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-[11px] text-gray-500 outline-none focus:border-black transition-colors font-mono mt-1.5"
                />
              )}
            </div>

            {/* Base URL */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-1">
                Base URL
                {configForm.provider !== 'custom' && <span className="normal-case tracking-normal text-gray-300 ml-1">（已自动填充）</span>}
              </label>
              <input
                type="text"
                value={configForm.baseUrl}
                onChange={(e) => setConfigForm(prev => ({ ...prev, baseUrl: e.target.value, provider: 'custom' }))}
                placeholder="https://api.example.com/v1"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-black transition-colors font-mono"
              />
            </div>

            {/* Config Message */}
            {configMsg && (
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
                configMsg.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
              }`}>
                {configMsg.type === 'success' ? <CheckCircle className="h-3 w-3 flex-shrink-0" /> : <AlertTriangle className="h-3 w-3 flex-shrink-0" />}
                {configMsg.text}
              </div>
            )}

            {/* Config Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveConfig}
                disabled={configSaving}
                className="flex-1 px-3 py-2 bg-black text-white rounded-lg text-xs font-medium disabled:opacity-40 hover:bg-gray-800 transition-colors"
              >
                {configSaving ? '保存中...' : '保存配置'}
              </button>
              {aiStatus.hasCustomKey && (
                <button
                  onClick={handleClearConfig}
                  disabled={configSaving}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-500 hover:text-black hover:border-gray-300 transition-colors"
                >
                  恢复内置
                </button>
              )}
            </div>
          </div>
        )}

        {/* Usage Indicator */}
        {!aiStatus.hasCustomKey && aiStatus.remaining != null && (
          <div className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs ${
            isLimited
              ? 'bg-amber-50 border border-amber-200'
              : aiStatus.remaining <= 5
                ? 'bg-amber-50/50 border border-amber-100'
                : 'bg-gray-50 border border-gray-100'
          }`}>
            <span className={isLimited ? 'text-amber-700' : aiStatus.remaining <= 5 ? 'text-amber-600' : 'text-gray-500'}>
              {isLimited ? '免费额度已用完' : `剩余 ${aiStatus.remaining}/${aiStatus.limit} 次`}
            </span>
            {isLimited ? (
              <button
                onClick={() => { setShowSettings(true); setConfigMsg(null); }}
                className="text-[10px] font-medium text-amber-700 hover:underline"
              >
                配置 API Key →
              </button>
            ) : aiStatus.remaining <= 5 ? (
              <span className="text-[10px] text-amber-500">额度即将用完</span>
            ) : null}
          </div>
        )}

        {/* Limited State Full Block */}
        {isLimited && !showSettings ? (
          <div className="text-center py-6 space-y-3">
            <AlertTriangle className="h-8 w-8 text-amber-400 mx-auto" strokeWidth={1.5} />
            <p className="text-sm text-gray-600">内置 AI 免费额度已用完</p>
            <p className="text-xs text-gray-400 leading-relaxed px-4">
              为避免过多用户占用公共资源，每位用户限免费使用 {aiStatus.limit} 次。<br />
              配置自己的 API Key 即可无限制使用。
            </p>
            <button
              onClick={() => { setShowSettings(true); setConfigMsg(null); }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors"
            >
              <Settings className="h-3 w-3" />
              去配置
            </button>
          </div>
        ) : (
          <>
            {/* Mode Toggle */}
            <div className="flex gap-2">
              {MODES.map(m => (
                <button
                  key={m.id}
                  onClick={() => { setMode(m.id); setResult(null); setError(null); }}
                  className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    mode === m.id
                      ? 'bg-black text-white'
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  <m.icon size={13} />
                  {m.label}
                </button>
              ))}
            </div>

            {/* Industry Selector */}
            {mode === 'optimize' && (
              <div className="relative">
                <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-1.5">目标行业</label>
                <div className="relative">
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-black transition-colors cursor-pointer pr-8"
                  >
                    {INDUSTRIES.map(i => (
                      <option key={i.value} value={i.value}>{i.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
                </div>
              </div>
            )}

            {/* Selection Hint */}
            {mode === 'optimize' && hasSelection && (
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg">
                <span className="text-[10px] text-blue-600 flex-1">
                  已选中 {editorSelection.text.length} 个字符，将直接优化选中内容
                </span>
                <button
                  onClick={handleUseSelection}
                  className="text-[10px] text-blue-700 font-medium hover:underline whitespace-nowrap"
                >
                  填入输入框
                </button>
              </div>
            )}

            {/* Input */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-1.5">
                {mode === 'optimize' ? '待优化内容' : '您的指令'}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-black transition-colors min-h-[80px] resize-none text-sm text-gray-800 placeholder-gray-300"
                placeholder={
                  mode === 'optimize'
                    ? (hasSelection ? '可直接点击生成，或在此粘贴其他内容...' : '粘贴需要优化的简历内容...')
                    : '例如：帮我写一段 3 年 Java 后端开发的工作经历...'
                }
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-[10px] text-gray-300">Ctrl + Enter 快速生成</span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="px-3 py-2.5 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-gray-400">
                    {mode === 'optimize' ? '优化结果' : 'AI 建议'}
                  </span>
                </div>
                <div className="px-3 py-3 max-h-[200px] overflow-y-auto">
                  <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">{result}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end items-center gap-3 pt-1 pb-1">
              {!result ? (
                <button
                  onClick={handleGenerate}
                  disabled={isLoading || (!input.trim() && !(mode === 'optimize' && hasSelection))}
                  className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded-lg text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-3 w-3" />
                      <span>生成中...</span>
                    </>
                  ) : (
                    <>
                      <span>生成</span>
                      <ArrowRight className="h-3 w-3" />
                    </>
                  )}
                </button>
              ) : (
                <>
                  <button
                    onClick={() => { setResult(null); setError(null); }}
                    className="px-3 py-2 text-[10px] uppercase tracking-wider text-gray-400 hover:text-black transition-colors"
                  >
                    丢弃
                  </button>
                  {hasSelection && mode === 'optimize' && (
                    <button
                      onClick={handleApplyReplace}
                      className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
                    >
                      <Replace size={12} />
                      替换选中
                    </button>
                  )}
                  <button
                    onClick={handleApplyAppend}
                    className="flex items-center gap-1.5 px-3 py-2 bg-black text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors"
                  >
                    <ClipboardPaste size={12} />
                    追加到末尾
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
