import type { CurrencySwapFormValues } from '../types';

export default function SwapButton({
    from,
    to,
    onClick,
}: CurrencySwapFormValues) {
    return (
        <div className="flex justify-center -my-2 relative z-10">
            <button
                type="button"
                onClick={() => onClick(from, to)}
                disabled={!from || !to}
                className="bg-white border-2 border-gray-200 rounded-full p-2 shadow-md hover:shadow-lg hover:border-blue-300 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:shadow-md"
                title="Hoán đổi currency"
            >
                <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200 group-hover:rotate-180 transform transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                </svg>
            </button>
        </div>
    );
}
