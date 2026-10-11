import React from 'react';

const Barcode = ({ vertical = false }: { vertical?: boolean }) => {
  // Generate a random-looking barcode pattern
  const lines = [
    4, 2, 6, 2, 2, 4, 8, 2, 4, 2, 2, 6, 4, 2, 2, 8, 4, 2, 6, 2, 2, 4, 2, 6, 4, 2, 2, 8, 2, 4, 2, 6
  ];

  return (
    <div className={`flex ${vertical ? 'flex-col h-full w-12' : 'flex-row w-full h-10'} justify-between`}>
      {lines.map((width, i) => (
        <div
          key={i}
          className="bg-[#362211]"
          style={{
            [vertical ? 'height' : 'width']: `${width}px`,
            [vertical ? 'width' : 'height']: '100%',
          }}
        />
      ))}
    </div>
  );
};

const QRCode = () => (
  <div className="w-12 h-12 grid grid-cols-5 grid-rows-5 gap-[1px] bg-[#362211] p-[2px]">
    {Array.from({ length: 25 }).map((_, i) => {
      // Create a pseudo-random QR pattern
      const isFilled = [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24, 6, 8, 12, 16, 18].includes(i);
      return (
        <div key={i} className={isFilled ? 'bg-[#f4ebe1]' : 'bg-[#362211]'} />
      );
    })}
  </div>
);

const Ticket = () => {
  return (
    <div className="flex w-[800px] h-[320px] bg-[#f4ebe1] rounded-sm shadow-2xl overflow-hidden text-[#5c4028] font-sans relative">
      {/* Left Image Section */}
      <div className="w-[340px] p-4 pr-0">
        <div className="w-full h-full relative overflow-hidden rounded-sm">
          <img 
            src="https://images.unsplash.com/photo-1525926477800-7a3b10316ac6?q=80&w=1000&auto=format&fit=crop" 
            alt="Orchestra" 
            className="w-full h-full object-cover grayscale-[30%] sepia-[40%] contrast-125"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Middle Content Section */}
      <div className="flex-1 p-8 pr-10 flex flex-col justify-between relative">
        <div>
          <h1 className="text-[3.5rem] font-serif font-black leading-[1.1] tracking-tight mb-6 text-[#5c4028]">
            The Mozart<br />Orchestra
          </h1>
          
          <div className="flex justify-between items-start mt-2">
            <div>
              <div className="text-4xl font-bold tracking-tight">18:00</div>
              <div className="text-2xl font-medium mt-1">20.07</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold tracking-tight mb-2">12+</div>
              <div className="text-sm font-semibold tracking-wide">Moscow, Big Theater</div>
              <div className="text-sm font-medium opacity-80">Theatre Square, 1</div>
            </div>
          </div>
        </div>

        {/* Bottom Row: QR & Barcode */}
        <div className="flex justify-between items-end">
          <QRCode />
          <div className="flex flex-col items-center">
            <div className="text-[10px] tracking-[0.2em] font-bold mb-2 flex items-center gap-2">
              WWW.MOSCOW.RU
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <div className="w-64">
              <Barcode />
            </div>
          </div>
        </div>
      </div>

      {/* Divider & Stub Section */}
      <div className="w-[140px] relative flex items-center justify-center border-l-[3px] border-dashed border-[#5c4028]/20">
        {/* Top and Bottom Cutouts */}
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#362211] rounded-full shadow-inner"></div>
        <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-[#362211] rounded-full shadow-inner"></div>
        
        {/* Vertical Barcode */}
        <div className="h-[260px] py-4">
          <Barcode vertical />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 overflow-hidden">
      {/* Container to handle scaling for smaller screens while keeping exact proportions */}
      <div className="relative w-[900px] h-[500px] flex items-center justify-center scale-75 md:scale-100">
        
        {/* Back Ticket */}
        <div className="absolute transform -rotate-[8deg] -translate-y-8 -translate-x-4 opacity-95">
          <Ticket />
        </div>
        
        {/* Front Ticket */}
        <div className="absolute transform rotate-[2deg] translate-y-8 translate-x-4">
          <Ticket />
        </div>
        
      </div>
    </div>
  );
}
