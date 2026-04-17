import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";


const NotesNotFound = () => {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-10 max-w-lg mx-auto text-center">
        {/* Soft Blue & Red Abstract Iconography */}
        <div className="relative">
          <div className="bg-primary/5 rounded-full p-16 transition-transform hover:scale-105 duration-700">
            <NotebookIcon className="size-16 text-primary/40 stroke-[1px]" />
          </div>
          {/* Floating Red Accents (The French "Confetti") */}
          <div className="absolute -top-4 -right-2 bg-secondary/10 size-10 rounded-full blur-xl" />
          <div className="absolute bottom-2 -left-4 bg-primary/20 size-12 rounded-full blur-2xl" />
          <div className="absolute top-1/2 -right-8 size-4 bg-secondary/20 rounded-full" />
        </div>

        <div className="space-y-4">
          <h3 className="text-4xl font-serif italic text-primary">Le Premier Pas</h3>
          <p className="text-primary/60 text-lg font-light leading-relaxed max-w-sm mx-auto">
            Your board is a quiet white space waiting for your first blue ink. 
            Shall we begin the journey?
          </p>
        </div>

        <Link 
          to="/create" 
          className="btn btn-primary btn-lg rounded-full px-12 border-none shadow-[0_15px_30px_rgba(58,119,255,0.25)] hover:shadow-[0_20px_40px_rgba(58,119,255,0.35)] hover:-translate-y-1 transition-all text-white"
        >
          <PlusIcon className="size-5 mr-2" />
          <span className="tracking-wide">Create Your First Note</span>
        </Link>
      </div>
    );
}

export default NotesNotFound;