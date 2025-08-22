import React, { useState } from 'react';
import ExcelUpload from './ExcelUpload';
import ManualEventForm from './ManualEventForm';
import EventTypeManager from './EventTypeManager';
import ImageDownload from './ImageDownload';
import CommonEvents from './CommonEvents';
import TextSettings from './TextSettings';

interface SideDrawerProps {
  className?: string;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ className: _className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'input' | 'types' | 'memo' | 'text' | 'download'>('input');

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };


  const tabs = [
    { id: 'input', label: '일정 추가' },
    { id: 'types', label: '일정 유형' },
    { id: 'memo', label: '월간 메모' },
    { id: 'text', label: '텍스트 설정' },
    { id: 'download', label: '내보내기' },
  ];

  return (
    <>
      {/* Handle - Always visible - Top Right - 더 간단한 접근법 */}
      <div
        style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          zIndex: 99999,
          pointerEvents: 'auto'
        }}
      >
        <button
          onClick={toggleDrawer}
          style={{
            backgroundColor: isOpen ? '#475569' : '#1e293b',
            color: 'white',
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            fontFamily: "'OnglipBakdahyeonche', sans-serif",
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
        >
          <span>{isOpen ? '닫기' : '설정'}</span>
        </button>
      </div>

      {/* Drawer Panel */}
      <div 
        style={{
          position: 'fixed',
          top: '0',
          right: isOpen ? '0' : '-25rem',
          height: '100vh',
          width: window.innerWidth <= 768 ? '100vw' : '23.75rem',
          backgroundColor: 'white',
          boxShadow: '-10px 0 25px -5px rgba(0, 0, 0, 0.1), 0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 50,
          fontFamily: "'OnglipBakdahyeonche', sans-serif",
          borderLeft: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          color: 'white',
          padding: '24px',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              margin: 0,
              background: 'linear-gradient(45deg, #ffffff, #e2e8f0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              캘린더 설정
            </h2>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ 
          background: 'linear-gradient(to bottom, #f8fafc, #f1f5f9)',
          padding: '16px',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  fontFamily: "'OnglipBakdahyeonche', sans-serif",
                  background: activeTab === tab.id 
                    ? 'linear-gradient(135deg, #1e293b, #334155)' 
                    : 'linear-gradient(135deg, #ffffff, #f8fafc)',
                  color: activeTab === tab.id ? 'white' : '#475569',
                  boxShadow: activeTab === tab.id 
                    ? '0 4px 12px rgba(30, 41, 59, 0.3)' 
                    : '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                  }
                }}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          backgroundColor: '#ffffff',
          minHeight: 0,
          boxSizing: 'border-box'
        }}>
          {activeTab === 'input' && (
            <div className="space-y-6">
              {/* Excel Upload Section */}
              <div style={{
                backgroundColor: 'transparent',
                borderRadius: '0.75rem',
                padding: '1.25rem',
                border: '1px solid #d1d5db',
                boxSizing: 'border-box',
                overflow: 'hidden'
              }}>
                <div className="flex items-center space-x-3 mb-6">
                  <h3 className="text-xl font-bold text-slate-800">Excel 가져오기</h3>
                </div>
                <ExcelUpload />
              </div>

              {/* Manual Input Section */}
              <div style={{
                backgroundColor: 'transparent',
                borderRadius: '0.75rem',
                padding: '1.25rem',
                border: '1px solid #d1d5db',
                boxSizing: 'border-box',
                overflow: 'hidden'
              }}>
                <div className="flex items-center space-x-3 mb-6">
                  <h3 className="text-xl font-bold text-slate-800">직접 입력</h3>
                </div>
                <ManualEventForm />
              </div>
            </div>
          )}

          {activeTab === 'types' && (
            <div style={{
              backgroundColor: 'transparent',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #d1d5db',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}>
              <EventTypeManager />
            </div>
          )}

          {activeTab === 'memo' && (
            <div style={{
              backgroundColor: 'transparent',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #d1d5db',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}>
              <CommonEvents />
            </div>
          )}

          {activeTab === 'text' && (
            <div style={{
              backgroundColor: 'transparent',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #d1d5db',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}>
              <TextSettings />
            </div>
          )}

          {activeTab === 'download' && (
            <div style={{
              backgroundColor: 'transparent',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #d1d5db',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}>
              <ImageDownload />
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleDrawer}
        />
      )}
    </>
  );
};

export default SideDrawer;