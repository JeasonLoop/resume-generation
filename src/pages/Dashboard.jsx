import React, { useEffect, useState, useRef } from 'react';
import axios from '../utils/axios';
import { Plus, Search, LayoutGrid, List as ListIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import LoadingScreen from '../components/LoadingScreen';
import { DeleteConfirmDialog } from '../components/common/ConfirmDialog';
import { DashboardSkeleton } from '../components/common/Skeleton';
import ResumeCard from '../components/dashboard/ResumeCard';
import SelectionBar from '../components/dashboard/SelectionBar';
import EmptyState, { CreateNewCard } from '../components/dashboard/EmptyState';
import TemplateSelector from '../components/dashboard/TemplateSelector';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [templates, setTemplates] = useState([]);

  // Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [selectedResumeIds, setSelectedResumeIds] = useState(new Set());
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchResumes();
    fetchTemplates();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await axios.get('/resumes');
      setResumes(response.data.data.list || []);
    } catch (error) {
      console.error('Failed to fetch resumes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await axios.get('/templates');
      setTemplates(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    }
  };

  const confirmDelete = (id) => {
    setResumeToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmBatchDelete = () => {
    setResumeToDelete(null);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Single delete
      if (resumeToDelete) {
        await axios.delete(`/resumes/${resumeToDelete}`);
        setResumes(resumes.filter(r => r.id !== resumeToDelete));
        if (selectedResumeIds.has(resumeToDelete)) {
          const newSet = new Set(selectedResumeIds);
          newSet.delete(resumeToDelete);
          setSelectedResumeIds(newSet);
        }
      }
      // Batch delete
      else if (selectedResumeIds.size > 0) {
        const idsToDelete = Array.from(selectedResumeIds);
        await axios.post('/resumes/batch-delete', { ids: idsToDelete });
        setResumes(resumes.filter(r => !selectedResumeIds.has(r.id)));
        setSelectedResumeIds(new Set());
      }
    } catch (error) {
      console.error('Failed to delete resume:', error);
    } finally {
      setIsDeleteModalOpen(false);
      setResumeToDelete(null);
      setIsDeleting(false);
    }
  };

  const toggleSelection = (id) => {
    const newSelected = new Set(selectedResumeIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedResumeIds(newSelected);
  };

  const clearSelection = () => {
    setSelectedResumeIds(new Set());
  };

  const handleCreateNew = async (templateId = null) => {
    try {
      const defaultContent = `# 您的姓名

[your.email@example.com](mailto:your.email@example.com) | [123-456-7890](tel:1234567890) | [个人网站](https://example.com)

## 个人总结

富有激情和创造力的专业人士，拥有5年以上的行业经验。擅长团队协作、项目管理和创新解决方案的设计与实施。致力于通过技术和设计提升用户体验，并在快节奏的环境中保持高效产出。

## 工作经历

### 高级项目经理 | 某知名科技公司
*2020年1月 - 至今*

- 领导跨职能团队完成核心产品的迭代开发，提升用户活跃度30%。
- 优化敏捷开发流程，缩短产品上市周期20%。
- 负责与关键客户沟通需求，确保项目交付符合预期标准。

### 软件工程师 | 某初创企业
*2017年6月 - 2019年12月*

- 参与核心业务系统的架构设计与编码实现。
- 解决高并发场景下的性能瓶颈，系统吞吐量提升50%。
- 编写高质量的技术文档，协助新成员快速上手。

## 教育背景

### 计算机科学与技术 | 某重点大学
*本科 | 2013年9月 - 2017年6月*

## 技能特长

- **编程语言**: JavaScript, Python, Java
- **框架/工具**: React, Node.js, Docker
- **语言能力**: 英语 (流利), 中文 (母语)
`;

      const response = await axios.post('/resumes', {
        title: '未命名简历',
        content_json: {},
        content_markdown: defaultContent,
        is_public: false,
        template_id: templateId
      });
      window.location.href = `/editor/${response.data.data.id}`;
    } catch (error) {
      console.error('Failed to create resume:', error);
      alert(error.message || '创建简历失败，请重新登录');
    }
  };

  const handleImport = async (file) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target.result;
      const fileName = file.name.replace(/\.[^/.]+$/, "");

      try {
        const response = await axios.post('/resumes', {
          title: fileName || '导入的简历',
          content_json: {},
          content_markdown: content,
          is_public: false,
          template_id: null
        });
        window.location.href = `/editor/${response.data.data.id}`;
      } catch (error) {
        console.error('Failed to import resume:', error);
      }
    };
    reader.readAsText(file);
  };

  const openTemplateSelector = () => {
    setIsTemplateModalOpen(true);
  };

  const filteredResumes = resumes.filter(resume =>
    resume.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-transparent font-sans pb-20">
      <Navbar />

      <main className="pt-32 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 animate-fade-in-up">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 block mb-4">仪表盘</span>
            <h1 className="text-5xl md:text-7xl font-serif text-black tracking-tight leading-none">
              您的<br/>作品集
            </h1>
          </div>
          <div className="mt-8 md:mt-0 flex flex-col items-end space-y-4">
             <div className="flex items-center space-x-4 text-xs uppercase tracking-[0.1em] text-gray-400 font-medium">
                <span>Total Projects: <span className="text-black">{resumes.length}</span></span>
             </div>
            <button
              onClick={openTemplateSelector}
              className="chic-btn group bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md">
              <span className="flex items-center space-x-2">
                <span>新建项目</span>
                <Plus size={14} strokeWidth={1} className="group-hover:rotate-90 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>

        {/* Selection Bar */}
        <SelectionBar
          count={selectedResumeIds.size}
          onBatchDelete={confirmBatchDelete}
          onClearSelection={clearSelection}
        />

        {/* Toolbar Section */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 animate-fade-in-up" style={{animationDelay: '100ms'}}>
          {/* Search Bar */}
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={16} strokeWidth={1.5} />
            <input
              type="text"
              placeholder="搜索简历..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/40 backdrop-blur-sm border-b border-gray-300 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-black transition-all placeholder-gray-400 hover:bg-white/60"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2 bg-white/40 backdrop-blur-sm p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}>
              <LayoutGrid size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}>
              <ListIcon size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <DashboardSkeleton />
        ) : filteredResumes.length === 0 ? (
          <EmptyState searchQuery={searchQuery} onNewProject={openTemplateSelector} />
        ) : (
          <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredResumes.map((resume, index) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                index={index}
                viewMode={viewMode}
                isSelected={selectedResumeIds.has(resume.id)}
                onToggleSelection={toggleSelection}
                onDelete={confirmDelete}
              />
            ))}

            {viewMode === 'grid' && (
              <CreateNewCard
                onClick={openTemplateSelector}
                delay={filteredResumes.length * 50 + 200}
              />
            )}
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={resumeToDelete ? '这份简历' : `${selectedResumeIds.size} 份简历`}
        isLoading={isDeleting}
      />

      {/* Template Selector */}
      <TemplateSelector
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        templates={templates}
        onTemplateSelect={handleCreateNew}
        onImport={handleImport}
      />
    </div>
  );
};

export default Dashboard;
