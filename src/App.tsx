import { useState } from 'react';
import { CalendarProvider } from './contexts/CalendarContext';
import Calendar from './components/Calendar';
import DateSelector from './components/DateSelector';
import ExcelUpload from './components/ExcelUpload';
import ManualEventForm from './components/ManualEventForm';
import EventTypeManager from './components/EventTypeManager';
import CommonEvents from './components/CommonEvents';
import ImageDownload from './components/ImageDownload';

function App() {
  const [activeTab, setActiveTab] = useState<'input' | 'types' | 'download'>('input');

  return (
    <CalendarProvider>
      <div id="app-container" className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Calendar
            </h1>
            <p className="text-gray-500">
              Create beautiful monthly calendars
            </p>
          </div>

          {/* Date Selector */}
          <div className="flex justify-center mb-8">
            <DateSelector />
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Calendar - Full Width */}
            <Calendar />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Panel - Controls */}
              <div className="bg-gray-50 rounded-xl p-6">
                {/* Tab Navigation */}
                <div className="flex space-x-2 mb-6">
                  <button
                    onClick={() => setActiveTab('input')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'input'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Add Events
                  </button>
                  <button
                    onClick={() => setActiveTab('types')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'types'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Event Types
                  </button>
                  <button
                    onClick={() => setActiveTab('download')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'download'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Export
                  </button>
                </div>

                {/* Tab Content */}
                <div>
                  {activeTab === 'input' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-4">
                          Excel Import
                        </h3>
                        <ExcelUpload />
                      </div>
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="font-medium text-gray-900 mb-4">
                          Manual Entry
                        </h3>
                        <ManualEventForm />
                      </div>
                    </div>
                  )}

                  {activeTab === 'types' && <EventTypeManager />}

                  {activeTab === 'download' && <ImageDownload />}
                </div>
              </div>

              {/* Right Panel - Common Events */}
              <div>
                <CommonEvents />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CalendarProvider>
  );
}

export default App;
