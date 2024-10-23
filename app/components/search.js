"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Settings2, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Listing from "./listing";

function stringSimilarity(title, search) {
  const searchTerms = search.toLowerCase().split(" ");
  let score = 0;
  searchTerms.forEach((term) => {
    if (title.toLowerCase().includes(term)) {
      score += 1;
    }
  });
  return score;
}

const tags = [
  {
    value: "part-time",
    label: "Part-time",
  },
  {
    value: "full-time",
    label: "Full-time",
  },
  {
    value: "remote",
    label: "Remote",
  },
  {
    value: "one-day",
    label: "One day event",
  },
  {
    value: "summer",
    label: "Summer",
  },
  {
    value: "paid",
    label: "Paid",
  },
  {
    value: "nonprofit",
    label: "Nonprofit",
  },
  {
    value: "education",
    label: "Education",
  },
  {
    value: "community-service",
    label: "Community Service",
  },
  {
    value: "social-activism",
    label: "Social activism",
  },
  {
    value: "environmental",
    label: "Environmental",
  },
  {
    value: "leadership",
    label: "Leadership",
  },
  {
    value: "coding",
    label: "Coding",
  },
  {
    value: "sports",
    label: "Sports",
  },
  {
    value: "pvsa",
    label: "PVSA Approved",
  },
  {
    value: "age-requirement",
    label: "Age Requirement",
  },
  {
    value: "laboratory-work",
    label: "Laboratory Work",
  },
  {
    value: "tutoring",
    label: "Tutoring",
  },
  {
    value: "stem",
    label: "STEM-related",
  },
  {
    value: "liberal",
    label: "Liberal Arts",
  },
];

export default function Search({ listings, todos, userId }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const filteredListings = listings
    .filter((listing) => {
      const titleScore = stringSimilarity(listing.title, searchQuery);
      const descriptionMatch = listing.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const tagMatch =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => listing.tags.includes(tag.value));

      return (titleScore > 0 || descriptionMatch) && tagMatch;
    })
    .sort((a, b) => {
      const scoreA = stringSimilarity(a.title, searchQuery);
      const scoreB = stringSimilarity(b.title, searchQuery);
      return scoreB - scoreA;
    });

  const toggleTag = (currentTag) => {
    setSelectedTags((prev) =>
      prev.some((tag) => tag.value === currentTag.value)
        ? prev.filter((tag) => tag.value !== currentTag.value)
        : [...prev, currentTag],
    );
  };

  return (
    <div>
      <div className="flex space-x-2 mt-8">
        <Input
          type="text"
          name="search"
          className="bg-white"
          placeholder="Search listings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon">
              <Settings2 strokeWidth={1.5} className="w-6 h-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {tags.map((tag) => (
                    <CommandItem
                      key={tag.value}
                      onSelect={() => toggleTag(tag)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedTags.some(
                            (selected) => selected.value === tag.value,
                          )
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {tag.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="pt-4 space-y-4">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <Listing
              key={listing.id}
              listing={listing}
              todos={todos}
              userId={userId}
            />
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            No listings found.
          </p>
        )}
      </div>
    </div>
  );
}
