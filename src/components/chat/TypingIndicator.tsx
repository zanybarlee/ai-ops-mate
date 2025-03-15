
const TypingIndicator = () => {
  return (
    <div className="max-w-[80%] mr-auto animate-fade-in">
      <div className="glass p-3 rounded-2xl rounded-tl-none">
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
