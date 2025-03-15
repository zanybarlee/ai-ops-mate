
import { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { popularSearches } from './mockData';
import { useToast } from '@/components/ui/use-toast';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isSearching: boolean;
}

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, isSearching }: SearchBarProps) => {
  const { toast } = useToast();

  return (
    <Card className="glass-card overflow-hidden mb-6">
      <CardHeader className="pb-2 flex flex-col space-y-2">
        <CardTitle className="text-2xl font-medium text-center">Find Solutions Quickly</CardTitle>
        <p className="text-center text-muted-foreground mb-4">
          Our AI-powered knowledge base continuously learns from incident resolutions and technical documentation
        </p>
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            type="search"
            placeholder="Search for technical solutions, guides, or issues..."
            className="pl-10 py-6 text-base focus-visible:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isSearching}
          />
          <Button 
            type="submit"
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
            disabled={isSearching || !searchQuery.trim()}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </form>
        
        {popularSearches.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {popularSearches.map((term, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(term)}
                className="text-sm text-primary hover:underline focus:outline-none"
                disabled={isSearching}
              >
                {term}
              </button>
            ))}
          </div>
        )}
      </CardHeader>
    </Card>
  );
};

export default SearchBar;
