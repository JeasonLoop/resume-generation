import React, { useState, useEffect, useRef } from 'react';
import { X, Printer, Download, Loader2, FileText, Image as ImageIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useResumeStore from '../../store/useResumeStore';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const PrintSettingsModal = ({ isOpen, onClose, printSettings, onSettingsChange }) => {
  const { resume, templates } = useResumeStore();
  const [localSettings, setLocalSettings] = useState(printSettings);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(null); // { step: string, percentage: number }
  const [exportError, setExportError] = useState(null);
  const previewRef = useRef(null);

  useEffect(() => {
    setLocalSettings(printSettings);
  }, [printSettings]);

  if (!isOpen) return null;

  const handleApply = () => {
    onSettingsChange(localSettings);
  };

  const handleExportPDF = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    setExportError(null);
    try {
      setExportProgress({ step: '准备导出...', percentage: 10 });
      // Apply settings before export
      onSettingsChange(localSettings);

      // Wait for DOM to update
      await new Promise(resolve => setTimeout(resolve, 300));
      setExportProgress({ step: '渲染页面内容...', percentage: 30 });

      const element = previewRef.current;

      // Calculate dimensions based on settings
      const pageWidth = localSettings.pageSize === 'A4' ? 210 : 215.9; // mm

      // Use html2canvas to capture the element
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        onProgress: (progress) => {
          setExportProgress({ step: '渲染页面内容...', percentage: 30 + Math.floor(progress * 40) });
        }
      });
      setExportProgress({ step: '生成PDF文件...', percentage: 75 });

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: localSettings.pageSize,
      });

      // Calculate image dimensions to fit page
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add image to PDF
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

      setExportProgress({ step: '准备下载...', percentage: 95 });
      // Save PDF
      const fileName = resume?.title?.trim() || 'resume';
      // Clean filename but keep readability
      const cleanFileName = fileName.replace(/[<>:"/\\|?*]+/g, '_').replace(/\s+/g, '_');
      pdf.save(`${cleanFileName}.pdf`);

      setExportProgress({ step: '导出完成！', percentage: 100 });
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      setExportError('PDF导出失败，请重试');
    } finally {
      setIsExporting(false);
      setTimeout(() => {
        setExportProgress(null);
      }, 1000);
    }
  };

  const handleExportImage = async (format = 'png') => {
    if (!previewRef.current) return;

    setIsExporting(true);
    setExportError(null);
    try {
      setExportProgress({ step: '准备导出...', percentage: 10 });
      // Apply settings before export
      onSettingsChange(localSettings);

      // Wait for DOM to update
      await new Promise(resolve => setTimeout(resolve, 300));
      setExportProgress({ step: '渲染页面内容...', percentage: 30 });

      const element = previewRef.current;

      // Use html2canvas to capture the element
      const canvas = await html2canvas(element, {
        scale: 3, // Higher scale for better image quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        onProgress: (progress) => {
          setExportProgress({ step: '渲染页面内容...', percentage: 30 + Math.floor(progress * 50) });
        }
      });
      setExportProgress({ step: '生成图片...', percentage: 85 });

      // Convert to image data
      const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
      const imgData = canvas.toDataURL(mimeType, 0.95);

      // Create download link
      const fileName = resume?.title?.trim() || 'resume';
      const cleanFileName = fileName.replace(/[<>:"/\\|?*]+/g, '_').replace(/\s+/g, '_');

      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${cleanFileName}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setExportProgress({ step: '导出完成！', percentage: 100 });
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.error(`Error exporting ${format.toUpperCase()}:`, error);
      setExportError(`${format.toUpperCase()}导出失败，请重试`);
    } finally {
      setIsExporting(false);
      setTimeout(() => {
        setExportProgress(null);
      }, 1000);
    }
  };

  const handleExportMarkdown = () => {
    try {
      const content = resume?.content_markdown || '';
      const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      const fileName = resume?.title?.trim() || 'resume';
      const cleanFileName = fileName.replace(/[<>:"/\\|?*]+/g, '_').replace(/\s+/g, '_');

      const link = document.createElement('a');
      link.href = url;
      link.download = `${cleanFileName}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      onClose();
    } catch (error) {
      console.error('Error exporting Markdown:', error);
      alert('Markdown导出失败，请重试');
    }
  };

  const selectedTemplate = templates.find(t => t.id === resume?.template_id);
  const customStyles = selectedTemplate?.css_styles || '';

  const pageWidth = localSettings.pageSize === 'A4' ? '210mm' : '215.9mm';
  const pageHeight = localSettings.pageSize === 'A4' ? '297mm' : '279.4mm';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <Download className="h-5 w-5 text-black" />
            <h2 className="text-xl font-bold font-serif">导出 PDF 设置</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Settings Panel */}
          <div className="w-72 p-6 border-r border-gray-100 overflow-y-auto space-y-6 bg-gray-50">
            {/* Font Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">字体设置</h3>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">字体</label>
                <select
                  value={localSettings.fontFamily}
                  onChange={(e) => setLocalSettings({ ...localSettings, fontFamily: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none bg-white"
                >
                  <option value="Inter, sans-serif">Inter</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="'Times New Roman', serif">Times New Roman</option>
                  <option value="Arial, sans-serif">Arial</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  字号: {localSettings.fontSize}px
                </label>
                <input
                  type="range"
                  min="10"
                  max="16"
                  value={localSettings.fontSize}
                  onChange={(e) => setLocalSettings({ ...localSettings, fontSize: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>

            {/* Spacing Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">间距设置</h3>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  行高: {localSettings.lineHeight}
                </label>
                <input
                  type="range"
                  min="1.2"
                  max="2.0"
                  step="0.1"
                  value={localSettings.lineHeight}
                  onChange={(e) => setLocalSettings({ ...localSettings, lineHeight: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  段落间距: {localSettings.paragraphSpacing}px
                </label>
                <input
                  type="range"
                  min="4"
                  max="24"
                  step="2"
                  value={localSettings.paragraphSpacing}
                  onChange={(e) => setLocalSettings({ ...localSettings, paragraphSpacing: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  页边距: {localSettings.pageMargin}mm
                </label>
                <input
                  type="range"
                  min="10"
                  max="30"
                  step="5"
                  value={localSettings.pageMargin}
                  onChange={(e) => setLocalSettings({ ...localSettings, pageMargin: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>

            {/* Page Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">页面设置</h3>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">纸张</label>
                <select
                  value={localSettings.pageSize}
                  onChange={(e) => setLocalSettings({ ...localSettings, pageSize: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black outline-none bg-white"
                >
                  <option value="A4">A4</option>
                  <option value="letter">Letter</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              {/* 导出进度提示 */}
              {exportProgress && (
                <div className="space-y-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-blue-700">{exportProgress.step}</span>
                    <span className="text-blue-600">{exportProgress.percentage}%</span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${exportProgress.percentage}%` }}
                    />
                  </div>
                </div>
              )}

              {/* 导出错误提示 */}
              {exportError && (
                <div className="p-3 bg-red-50 rounded-lg border border-red-100 flex items-center justify-between">
                  <span className="text-xs text-red-700">{exportError}</span>
                  <button
                    onClick={() => setExportError(null)}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    关闭
                  </button>
                </div>
              )}

              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="w-full chic-btn py-3 text-sm flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>导出中...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>导出 PDF</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleExportImage('png')}
                  disabled={isExporting}
                  className="flex items-center justify-center space-x-2 px-3 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-xs font-medium disabled:opacity-50"
                >
                  <ImageIcon size={14} />
                  <span>PNG 图片</span>
                </button>
                <button
                  onClick={() => handleExportImage('jpg')}
                  disabled={isExporting}
                  className="flex items-center justify-center space-x-2 px-3 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-xs font-medium disabled:opacity-50"
                >
                  <ImageIcon size={14} />
                  <span>JPG 图片</span>
                </button>
              </div>

              <button
                onClick={handleExportMarkdown}
                disabled={isExporting}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-xs font-medium disabled:opacity-50"
              >
                <FileText size={14} />
                <span>导出 Markdown (.md)</span>
              </button>

              <button
                onClick={handleApply}
                className="w-full px-4 py-2.5 border border-gray-200 text-gray-400 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-colors text-xs font-medium"
              >
                仅应用设置到预览
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="flex-1 bg-gray-200 p-6 overflow-y-auto">
            <div className="flex items-center justify-center">
              <div
                ref={previewRef}
                className="bg-white shadow-xl"
                style={{
                  width: pageWidth,
                  minHeight: pageHeight,
                  padding: `${localSettings.pageMargin}mm`,
                  fontFamily: localSettings.fontFamily,
                  fontSize: `${localSettings.fontSize}px`,
                  lineHeight: localSettings.lineHeight,
                  boxSizing: 'border-box',
                }}
              >
                <style>{`
                  ${customStyles}
                  .preview-content h1,
                  .preview-content h2,
                  .preview-content h3,
                  .preview-content h4 {
                    margin-top: 1em;
                    margin-bottom: 0.3em;
                    font-weight: 600;
                  }
                  .preview-content p {
                    margin-bottom: ${localSettings.paragraphSpacing}px;
                  }
                  .preview-content ul,
                  .preview-content ol {
                    margin-bottom: ${localSettings.paragraphSpacing}px;
                  }
                  .preview-content li {
                    margin-bottom: 2px;
                  }
                `}</style>
                <div className="preview-content prose max-w-none" style={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {resume?.content_markdown || '请在左侧编辑器输入简历内容...'}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintSettingsModal;
