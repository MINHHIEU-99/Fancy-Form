import { useEffect, useState } from 'react';
import { fetchTokenPrices } from '../services/tokenService';
import type { Token } from '../types';

export function useTokenPrices() {
    const [tokens, setTokens] = useState<Token[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTokenPrices()
            .then(setTokens)
            .finally(() => setLoading(false));
    }, []);

    return { tokens, loading };
}
