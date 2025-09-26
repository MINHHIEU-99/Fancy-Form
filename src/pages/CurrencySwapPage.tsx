import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTokenPrices } from '../features/currency-swap/hooks/useTokenPrices';
import { computeOutput } from '../features/currency-swap/utils/computeOutput';
import CustomDropdown from '../features/currency-swap/components/CustomDropdown';
import SwapButton from '../features/currency-swap/components/SwapButton';

export default function CurrencySwap() {
    const { tokens, loading } = useTokenPrices();
    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ defaultValues: { from: '', to: '', amount: '' } });

    const from = watch('from');
    const fromCurrency = tokens.find((t) => t.id === from);
    const to = watch('to'); // watch để lấy giá trị 'to' từ form
    const toCurrency = tokens.find((t) => t.id === to);
    const amount = parseFloat(watch('amount') || '0'); // parseFloat để chuyển string sang number
    const output = computeOutput(from, to, amount, tokens);

    const [validationErrors, setValidationErrors] = useState<{
        from?: string;
        to?: string;
    }>({});

    const onSubmit = (data: any) => {
        // Validate custom dropdowns
        const newErrors: { from?: string; to?: string } = {};

        if (!from) {
            newErrors.from = 'Select a currency';
        }
        if (!to) {
            newErrors.to = 'Select a currency';
        }
        if (from && to && from === to) {
            newErrors.to = 'Cannot swap to same token';
        }

        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
            return;
        }
        console.log('Swapping:', data);
        alert(
            `Swapping ${data.amount} ${
                fromCurrency?.currency
            } → ${output.toFixed(4)} ${toCurrency?.currency}`
        );
    };

    if (loading)
        return <div className="text-center p-10">Loading prices...</div>;

    return (
        <div className="min-w-[360px] max-w-[480px] w-full mx-auto my-10 bg-white shadow-xl rounded-2xl p-8 space-y-6">
            <h1 className="text-2xl font-bold text-center">💱 Currency Swap</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* FROM */}
                <div>
                    <label className="block text-sm font-medium">From</label>
                    <CustomDropdown
                        tokens={tokens}
                        value={from}
                        onChange={(value) => {
                            setValue('from', value);
                            setValidationErrors((prev) => ({
                                ...prev,
                                from: undefined,
                            }));
                        }}
                        placeholder="Select..."
                        disabled={to ? [to] : []}
                    />
                    {(errors.from || validationErrors.from) && (
                        <p className="text-red-500 text-xs">
                            {(errors.from?.message as string) ||
                                validationErrors.from}
                        </p>
                    )}
                </div>

                {/* SWAP BUTTON */}
                <SwapButton
                    from={from}
                    to={to}
                    onClick={(from, to) => {
                        if (from && to) {
                            setValue('from', to);
                            setValue('to', from);
                            setValidationErrors({});
                        }
                    }}
                />

                {/* TO */}
                <div>
                    <label className="block text-sm font-medium">To</label>
                    <CustomDropdown
                        tokens={tokens}
                        value={to}
                        onChange={(value) => {
                            setValue('to', value);
                            setValidationErrors((prev) => ({
                                ...prev,
                                to: undefined,
                            }));
                        }}
                        placeholder="Select..."
                        disabled={from ? [from] : []}
                    />
                    {(errors.to || validationErrors.to) && (
                        <p className="text-red-500 text-xs">
                            {(errors.to?.message as string) ||
                                validationErrors.to}
                        </p>
                    )}
                </div>

                {/* AMOUNT */}
                <div>
                    <label className="block text-sm font-medium">Amount</label>
                    <input
                        type="number"
                        step="any"
                        placeholder="Enter amount"
                        {...register('amount', {
                            required: 'Amount is required',
                            min: {
                                value: 0.0001,
                                message: 'Enter a valid amount',
                            },
                        })}
                        className="mt-1 w-full rounded-lg border p-2"
                    />
                    {errors.amount && (
                        <p className="text-red-500 text-xs">
                            {errors.amount.message as string}
                        </p>
                    )}
                </div>

                {/* OUTPUT */}
                {from && to && amount > 0 && (
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                        <span>Estimated Output:</span>
                        <span className="font-bold flex items-center gap-2">
                            {output.toFixed(4)}
                            <div className="flex items-center gap-1 text-sm">
                                {toCurrency?.currency}
                                <img
                                    src={toCurrency?.logo}
                                    alt={toCurrency?.currency}
                                    className="w-4 h-4 mr-1 rounded-full"
                                    onError={(e) => {
                                        (
                                            e.target as HTMLImageElement
                                        ).style.display = 'none';
                                    }}
                                />
                            </div>
                        </span>
                    </div>
                )}

                {/* ACTION */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                >
                    Swap
                </button>
            </form>
        </div>
    );
}
