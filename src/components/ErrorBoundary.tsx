import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);

        // Chunk load error detection
        const isChunkError = error.message.includes("Failed to fetch dynamically imported module") ||
            error.message.includes("Importing a module script failed");

        if (isChunkError) {
            // Check if we already tried to reload
            const storageKey = "chunk_load_error_reload";
            const lastReload = sessionStorage.getItem(storageKey);

            if (!lastReload) {
                // Set flag and reload
                sessionStorage.setItem(storageKey, "true");
                window.location.reload();
            } else {
                // We already tried to reload, clear the flag for next time
                sessionStorage.removeItem(storageKey);
            }
        }
    }

    public render() {
        if (this.state.hasError) {
            // If it's a chunk error specifically and we are here, it means the reload failed 
            // or we are in the "showing error" state after reload.
            // We can show a more specific message if we want, or keep the generic one.

            const isDev = import.meta.env.DEV;
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
                    <h1 className="text-2xl font-bold mb-4">Ein Update ist verfügbar</h1>
                    <p className="text-muted-foreground mb-6 max-w-md">
                        Eine neue Version der Webseite wurde veröffentlicht. Bitte laden Sie die Seite neu, um die neueste Version zu erhalten.
                    </p>
                    {isDev && (
                        <div className="bg-red-50 border border-red-200 p-4 rounded-md mb-6 text-left overflow-auto max-w-lg w-full text-xs font-mono text-red-800">
                            <strong>Dev Error:</strong><br />
                            {this.state.error?.toString()}<br /><br />
                            {this.state.error?.stack}
                        </div>
                    )}
                    <Button onClick={() => {
                        sessionStorage.removeItem("chunk_load_error_reload");
                        window.location.reload();
                    }} variant="default">
                        Seite neu laden
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}
