"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Check, CalendarIcon, X } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { createListing } from "../actions";

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
  {
    value: "pvsa",
    label: "PVSA Approved",
  },
  {
    value: "age-requirement",
    label:"Age Requirement",
  }
];

export default function Create() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [ageRequirement, setAgeRequirement] = useState("13+");
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 30),
  });

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

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append(
      "tags", /*change the word the tag actually says, next step change color*/
      JSON.stringify(selectedTags.map((tag) => tag.value)),
    );

    formData.append("dateRange", JSON.stringify(date));

    formData.append("age", ageRequirement);

    const result = await createListing(formData);

    if (result.success) {
      toast({
        title: "Success",
        description: "Listing created.",
      });
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  }
  return (
    <div>
      <Card className="w-auto min-w-[370px]">
        <CardHeader>
          <CardTitle>Create a Listing</CardTitle>
          <CardDescription>
            Create a volunteer or internship listing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  placeholder="Descriptive, eye-grabbing..."
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  name="description"
                  placeholder="Share more about your listing."
                />
              </div>
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
                    Add Tags
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
            <Accordion type="multiple" collapsible="true">
              <AccordionItem value="location">
                <AccordionTrigger>Location</AccordionTrigger>
                <AccordionContent>
                  <div className="p-2">
                    <Label htmlFor="location">Address</Label>
                    <Input
                      type="text"
                      placeholder="1234 Main St, Lazytown, Iceland"
                      name="location"
                    />
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
                      <Input
                        type="text"
                        name="email"
                        placeholder="m@example.com"
                      />
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="(555) 555-5555"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="age">
                <AccordionTrigger>Age</AccordionTrigger>
                <AccordionContent>
                  <div className="p-2">
                    <RadioGroup
                      defaultValue="13+"
                      onValueChange={setAgeRequirement}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="13+" id="13+" />
                        <Label htmlFor="13+">13+</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="18+" id="18+" />
                        <Label htmlFor="18+">18+</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="date">
                <AccordionTrigger>Date</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2 p-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date?.from ? (
                            date.to ? (
                              <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(date.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={setDate}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
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
