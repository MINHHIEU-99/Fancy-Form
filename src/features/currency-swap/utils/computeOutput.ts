import type { Token } from '../types';

export function computeOutput(
    from: string,
    to: string,
    amount: number,
    tokens: Token[]
) {
    if (!from || !to || amount <= 0) return 0;
    const fromPrice = tokens.find((t) => t.id === from)?.price ?? 0;
    const toPrice = tokens.find((t) => t.id === to)?.price ?? 0;
    return fromPrice && toPrice ? (amount * fromPrice) / toPrice : 0;
}
