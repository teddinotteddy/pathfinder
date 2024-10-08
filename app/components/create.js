"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    value: "environmental",
    label: "Environmental",
  },
];

export default function Create() {
  const [open, setOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (currentTag) => {
    setSelectedTags((prev) =>
      prev.some((tag) => tag.value === currentTag.value)
        ? prev.filter((tag) => tag.value !== currentTag.value)
        : [...prev, currentTag],
    );
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags((prev) =>
      prev.filter((tag) => tag.value !== tagToRemove.value),
    );
  };

  return (
    <div>
      <Card className="max-w-screen-sm">
        <CardHeader>
          <CardTitle>Create a Listing</CardTitle>
          <CardDescription>
            Create a volunteer or internship listing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-2">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Descriptive, eye-grabbing..."
              />
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                placeholder="Share more about your listing."
              />
            </div>
            <div>
              <div className="pb-2">
                {selectedTags.map((tag) => (
                  <Button
                    variant="ghost"
                    key={tag.value}
                    onClick={() => removeTag(tag)}
                  >
                    {tag.label}
                    <X strokeWidth={1} className="h-4 w-4" />
                  </Button>
                ))}
              </div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                  >
                    Tags
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
            <Accordion type="multiple" collapsible>
              <AccordionItem value="location">
                <AccordionTrigger>Location</AccordionTrigger>
                <AccordionContent>
                  <div className="p-2">
                    <Label htmlFor="location">Address</Label>
                    <Input type="text" placeholder="123 Main St" />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="contact">
                <AccordionTrigger>Contact</AccordionTrigger>
                <AccordionContent>
                  <div className="p-2 space-y-2">
                    <p className="text-sm font-extralight">
                      This information will be displayed publicly.
                    </p>
                    <div className="pt-2">
                      <Label htmlFor="email">Email</Label>
                      <Input type="text" placeholder="m@example.com" />
                      <Label htmlFor="phone">Phone</Label>
                      <Input type="tel" placeholder="(555) 555-5555" />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button>Create</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
