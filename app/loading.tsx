export default function Loading() {
	return(
        <>
           <main className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                    <p className="mt-4 text-slate-600">Loading product details...</p>
                </div>
            </main>
        </>
    );
	
}
