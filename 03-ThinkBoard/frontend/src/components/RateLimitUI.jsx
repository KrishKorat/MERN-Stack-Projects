import { ZapIcon } from "lucide-react";

const RateLimitUI = () => {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-primary/5 border-2 border-primary/10 rounded-[3rem] p-1">
          <div className="bg-white rounded-[2.8rem] flex flex-col md:flex-row items-center p-10 shadow-sm">
            <div className="flex-shrink-0 bg-secondary/10 p-5 rounded-full mb-4 md:mb-0 md:mr-8">
              <ZapIcon className="size-10 text-secondary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-serif text-primary italic mb-2">Un Petit Moment</h3>
              <p className="text-primary/70 font-medium">
                The server is catching its breath. 
              </p>
              <p className="text-sm font-bold text-secondary/60 uppercase tracking-widest mt-2">
                Please wait a few seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default RateLimitUI;