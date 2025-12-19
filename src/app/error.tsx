'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <h2 className="mb-4 text-2xl font-bold">Bir şeyler ters gitti!</h2>
            <div className="mb-8 max-w-lg rounded-lg bg-red-50 p-6 text-red-900">
                <p className="font-mono text-sm break-all">{error.message}</p>
                {error.digest && (
                    <p className="mt-2 text-xs text-red-700">Digest: {error.digest}</p>
                )}
            </div>
            <button
                className="rounded bg-navy px-4 py-2 text-white hover:bg-navy/90"
                onClick={() => reset()}
            >
                Tekrar Dene
            </button>
        </div>
    );
}
