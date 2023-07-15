import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function Loading() {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <AiOutlineLoading3Quarters className="animate-spin w-30 h-30" />
    </div>
  );
}

export default Loading;
