import { CalendarProvider } from './contexts/CalendarContext';
import Calendar from './components/Calendar';
import SideDrawer from './components/SideDrawer';
import CalendarControls from './components/CalendarControls';

function App() {
  return (
    <CalendarProvider>
      <div id="app-container" className="min-h-screen bg-gray-50" style={{fontFamily: "'OnglipBakdahyeonche', sans-serif"}}>
        <div className="py-4 md:py-8">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-2">
              달력
            </h1>
            <p className="text-slate-500 text-lg md:text-xl">
              손쉽게 일정을 관리하세요
            </p>
          </div>

          {/* Main Content - Calendar with Side Drawer */}
          <div className="relative">
            <Calendar />
            <SideDrawer />
            <CalendarControls />
          </div>
        </div>
      </div>
    </CalendarProvider>
  );
}

export default App;
