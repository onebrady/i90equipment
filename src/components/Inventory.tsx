import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface InventoryItem {
  title: string;
  type: string;
  condition: string;
  price: string;
  imageUrl: string;
  description: string;
  qty?: number;
}

const inventoryItems: InventoryItem[] = [
  {
    title: "USED 2021 ARNES TROUT RIVER BELT TRAILER",
    type: "Belt Trailer",
    condition: "Used",
    price: "$59,900",
    imageUrl: "https://cdn.prod.website-files.com/66c252c90e6c11373f18e6d6/685ed8abe452d81d030ad42b_494577123_705101529147592_4232795056119674189_n.jpg",
    description: "Specialized belt trailer system designed for efficient material transport. Ideal for aggregate and construction material hauling operations.",
  },
  {
    title: "2023 Manac 53 ft Stepdeck Trailer",
    type: "Step Deck Trailer",
    condition: "Used",
    price: "$49,900",
    imageUrl: "https://cdn.prod.website-files.com/66c252c90e6c11373f18e6d6/677e9dc5c92fcdb9ba43e92e_2023-Manac-53-ft-Stepdeck-Trailer-3.webp",
    description: "Premium Manac step deck trailer with 53-foot length. Perfect for oversized cargo and construction equipment transport.",
  },
  {
    title: "2016 Reitnouer B-Train",
    type: "Flatbed B-Train",
    condition: "Used",
    price: "$62,900",
    imageUrl: "https://cdn.prod.website-files.com/66c252c90e6c11373f18e6d6/677e8fcbe81fdb5acb6f4aac_2016-Reitnouer-B-Train-1.webp",
    description: "Reitnouer B-Train flatbed configuration. Proven workhorse for heavy hauling operations.",
    qty: 2,
  },
  {
    title: "2023 Alpha HD A80MG Lowboy Trailer",
    type: "Lowboy Trailer",
    condition: "Used",
    price: "$75,900",
    imageUrl: "https://cdn.prod.website-files.com/66c252c90e6c11373f18e6d6/677ea4a0575271521d67582a_2022-Alpha-HD-A80MG-Lowboy-Trailer-2.webp",
    description: "Alpha HD 80-ton lowboy trailer built for heavy equipment transport. Low deck height for oversized loads.",
  },
  {
    title: "2022 Reitnouer Conestoga Big Bubba Quad",
    type: "Conestoga Trailer",
    condition: "Used",
    price: "$82,900",
    imageUrl: "https://cdn.prod.website-files.com/66c252c90e6c11373f18e6d6/6786d17563d9a5024a6bd370_2022-Reitnouer-Conestoga-Big-Bubba-Quad-4.jpg",
    description: "Reitnouer's Big Bubba Quad Conestoga system. Sliding tarp system for all-weather protection.",
  },
  {
    title: "USED 2024 KENWORTH T800",
    type: "Heavy Haul Truck",
    condition: "Used",
    price: "$239,000",
    imageUrl: "https://cdn.prod.website-files.com/66c252c90e6c11373f18e6d6/685ecb6163a1cfc7e79738c2_1000010062.jpg",
    description: "2024 Kenworth T800 heavy haul truck. Purpose-built for towing heavy construction trailers.",
  },
  {
    title: "2020 Freightliner Cascadia",
    type: "Commercial Truck",
    condition: "Used",
    price: "$72,900",
    imageUrl: "https://cdn.prod.website-files.com/66c252c90e6c11373f18e6d6/677e8e2c9f5c21cb7f533d93_2020-Freightliner-Cascadia-3.webp",
    description: "2020 Freightliner Cascadia highway tractor. Reliable power for long-haul trailer operations.",
  },
];

const Inventory = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Premium Construction Trailers Available Now
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quality equipment from the industry's most trusted manufacturers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {inventoryItems.map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.imageUrl}
                    alt={`${item.title} - ${item.type} for sale in Montana`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                    {item.condition}
                  </Badge>
                  {item.qty && (
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      {item.qty} Available
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {item.description}
                </p>
                <div className="text-3xl font-bold text-primary">
                  {item.price}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full bg-secondary hover:bg-secondary-hover text-secondary-foreground">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View Full Inventory
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Inventory;
