import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Mail, ExternalLink, Code, FileText, Eye, Sparkles, Users, Download, Zap, Star, GitBranch, Heart, MessageCircle } from 'lucide-react';

const About = () => {
  const [avatarUrl] = useState('https://github.com/JeasonLoop.png');
  const [stats, setStats] = useState({ stars: 0, forks: 0 });

  // 模拟统计数据
  useEffect(() => {
    setStats({ stars: 128, forks: 45 });
  }, []);

  const features = [
    {
      icon: FileText,
      title: '丰富模板',
      description: '20+ 精美专业模板，涵盖多种行业风格',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Eye,
      title: '实时预览',
      description: '所见即所得的编辑体验，即时查看效果',
      color: 'green',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Download,
      title: '多格式导出',
      description: '支持 PDF、PNG、JPG 等多种格式导出',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: '极简操作',
      description: 'Markdown 语法支持，高效编辑简历内容',
      color: 'orange',
      gradient: 'from-orange-500 to-amber-500'
    }
  ];

  const techStack = [
    { name: 'React', color: 'bg-blue-100 text-blue-700' },
    { name: 'Node.js', color: 'bg-green-100 text-green-700' },
    { name: 'SQLite', color: 'bg-blue-100 text-blue-800' },
    { name: 'Tailwind CSS', color: 'bg-cyan-100 text-cyan-700' },
    { name: 'Vite', color: 'bg-purple-100 text-purple-700' },
    { name: 'Express', color: 'bg-gray-100 text-gray-700' }
  ];

  return (
    <div className="min-h-screen bg-transparent pt-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-24 animate-fade-in-up">
          <div className="mb-8 relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <img
              src={avatarUrl}
              alt="JeasonLoop"
              className="w-36 h-36 mx-auto rounded-full object-cover shadow-2xl ring-4 ring-white relative z-10"
            />
          </div>
          <h1 className="text-6xl font-serif text-gray-900 mb-6 tracking-tight">
            Resume<span className="font-light italic text-gray-600">.gen</span>
          </h1>
          <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            专业的在线简历生成工具，让您的简历脱颖而出
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <div className="flex items-center gap-2 text-gray-600">
              <Star size={18} className="text-yellow-500" />
              <span className="font-semibold">{stats.stars}</span>
              <span className="text-sm">Stars</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <GitBranch size={18} className="text-blue-500" />
              <span className="font-semibold">{stats.forks}</span>
              <span className="text-sm">Forks</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users size={18} className="text-purple-500" />
              <span className="font-semibold">1.2k+</span>
              <span className="text-sm">Users</span>
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <section className="mb-24 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 border border-white/50">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">关于项目</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
              </div>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p className="text-lg leading-relaxed">
                  简历生成器是一个功能强大且易于使用的在线工具，帮助您快速创建专业的简历。
                  我们致力于提供最佳的简历设计体验，让您的简历在众多求职者中脱颖而出。
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  通过直观的 Markdown 编辑器和丰富的模板选择，您可以轻松定制您的简历，
                  展示您的专业技能和经验。无论您是求职者还是人力资源专业人士，
                  这个工具都能满足您的需求。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-24 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">核心功能</h2>
            <p className="text-gray-500">强大的功能，简洁的设计</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:-translate-y-1"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="mb-24 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <Code className="w-8 h-8 text-blue-400" />
                <div>
                  <h2 className="text-3xl font-serif font-bold">技术栈</h2>
                  <p className="text-gray-400 mt-1">现代化的技术架构</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className={`${tech.color} px-5 py-2.5 rounded-full text-sm font-medium`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* GitHub Information */}
        <section className="mb-24 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8">
              <div className="flex items-center gap-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <div>
                  <h2 className="text-2xl font-bold text-white">开源项目</h2>
                  <p className="text-gray-400 text-sm mt-1">欢迎贡献代码</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://github.com/JeasonLoop.png"
                  alt="JeasonLoop"
                  className="w-16 h-16 rounded-xl object-cover shadow-md"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">JeasonLoop/resume-generation</h3>
                  <a
                    href="https://github.com/JeasonLoop/resume-generation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors group"
                  >
                    <span className="text-sm font-mono">github.com/JeasonLoop/resume-generation</span>
                    <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                这是一个开源项目，欢迎贡献代码、提出问题和参与讨论。
                我们相信通过社区的共同努力，可以创建更好的工具，帮助更多人制作出精美的简历。
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-100/50">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3">联系开发者</h2>
              <p className="text-gray-600">期待与您的交流</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  开发者信息
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 w-20">姓名</span>
                    <span className="text-gray-900 font-medium">JeasonLoop</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 w-20">职位</span>
                    <span className="text-gray-900 font-medium">全栈开发者</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 w-20">位置</span>
                    <span className="text-gray-900 font-medium">中国</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  联系方式
                </h3>
                <div className="space-y-4">
                  <a href="mailto:contact@resumegenerator.com" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors group">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <Mail className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <span className="text-sm">fsj77524@163.com</span>
                  </a>
                  <a href="https://qm.qq.com/cgi-bin/qm/qr?k=YOUR_QQ_KEY" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-blue-500 transition-colors group">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
                    </div>
                    <span className="text-sm">QQ: 396892858</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            用 <Heart size={14} className="text-red-500 fill-current" /> 制作
            <span className="mx-2">•</span>
            © 2024 Resume.gen
          </p>
        </div>
      </main>
    </div>
  );
};

export default About;