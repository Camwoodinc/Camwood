// This file declares modules without their own type definitions.

declare module 'wink-bm25-text-search' {
    interface BM25Options {
      fldWeights?: Record<string, number>;
    }
  
    interface Doc {
      id: string;
      body: string;
      [key: string]: any;
    }
  
    interface SearchResult {
      0: string; // docId
      1: number; // score
    }
  
    function BM25(): {
      defineConfig(options: BM25Options): void;
      definePrepTasks(tasks: any[]): void;
      addDoc(doc: Doc): void;
      consolidate(): void;
      search(query: string): SearchResult[];
    };
  
    export default BM25;
  }
  
  declare module 'wink-tokenizer' {
    export const its: any;
    export const as: {
      lowerCase: (token: any) => any;
      removePunc: (token: any) => any;
      removeDigits: (token: any) => any;
      removeStopWords: (token: any) => any;
      collapseWhitespace: (token: any) => any;
    };
  }
  