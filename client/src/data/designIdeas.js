import kitchenImage from '../assets/design-ideas/kitchen.webp'
import masterBedroomImage from '../assets/design-ideas/master-bedroom.webp'
import livingRoomImage from '../assets/design-ideas/living-room.webp'
import bathroomImage from '../assets/design-ideas/bathroom.webp'
import kidsBedroomImage from '../assets/design-ideas/kids-bedroom.webp'
import guestBedroomImage from '../assets/design-ideas/guest-bedroom.webp'
import balconyImage from '../assets/design-ideas/balcony.webp'
import diningAreaImage from '../assets/design-ideas/dining-area.webp'
import foyerAreaImage from '../assets/design-ideas/foyer-area.webp'
import homeOfficeImage from '../assets/design-ideas/home-office.webp'

const parentsBedroomImage = new URL('../assets/design-ideas/parents-bedroom/idea-1.jpg', import.meta.url).href;

const getIdeaImage = (category, index) => {
  return new URL(`../assets/design-ideas/${category}/idea-${index}.jpg`, import.meta.url).href;
};

export const DESIGN_IDEA_FILTER_TAGS = ['All', 'Bedroom & Living', 'Kitchen & Dining', 'Utility & Office', 'Bathroom']

export const DESIGN_IDEA_FILTER_MAP = {
  'Bedroom & Living': ['master-bedroom', 'parents-bedroom', 'guest-bedroom', 'kids-bedroom', 'living-room', 'balcony'],
  'Kitchen & Dining': ['kitchen', 'dining-area'],
  'Utility & Office': ['home-office', 'foyer-area'],
  'Bathroom': ['bathroom'],
}

export const ROOM_DATA = {
  kitchen: {
    label: 'Kitchen',
    img: kitchenImage,
    count: 12,
    cardDesc: 'Modular kitchens, storage solutions, premium countertops',
    desc: 'Our modular kitchen designs combine premium materials with intelligent storage to create a space where cooking becomes a joy. From L-shape to island kitchens, every inch is designed for function and beauty.',
    ideas: [
      { title: 'L-Shaped Modular Kitchen', img: getIdeaImage('kitchen', 1) },
      { title: 'Parallel/Galley Kitchen', img: getIdeaImage('kitchen', 2) },
      { title: 'U-Shaped Layout', img: getIdeaImage('kitchen', 3) },
      { title: 'Island Kitchen Concept', img: getIdeaImage('kitchen', 4) },
      { title: 'Straight/Single Wall Layout', img: getIdeaImage('kitchen', 5) },
      { title: 'Smart Pantry Pull-outs', img: getIdeaImage('kitchen', 6) },
      { title: 'Quartz Countertops', img: getIdeaImage('kitchen', 7) },
      { title: 'Glass Backsplash', img: getIdeaImage('kitchen', 8) },
      { title: 'Profile Handle Cabinets', img: getIdeaImage('kitchen', 9) },
      { title: 'Under-cabinet LED Lights', img: getIdeaImage('kitchen', 10) },
      { title: 'Corner Carousel Trays', img: getIdeaImage('kitchen', 11) },
      { title: 'Built-in Appliance Garages', img: getIdeaImage('kitchen', 12) }
    ]
  },
  'living-room': {
    label: 'Living Room',
    img: livingRoomImage,
    count: 12,
    cardDesc: 'Statement seating, TV units, elegant decor',
    desc: 'The living room is the heart of every home. We create spaces that are warm, welcoming and visually stunning, perfect for entertaining guests and relaxing with family.',
    ideas: [
      { title: 'Sofa & Seating Arrangements', img: getIdeaImage('living-room', 1) },
      { title: 'TV Unit Wall Designs', img: getIdeaImage('living-room', 2) },
      { title: 'False Ceiling Concepts', img: getIdeaImage('living-room', 3) },
      { title: 'Statement Rugs & Flooring', img: getIdeaImage('living-room', 4) },
      { title: 'Bookshelf Styling', img: getIdeaImage('living-room', 5) },
      { title: 'Curtain & Blind Ideas', img: getIdeaImage('living-room', 6) },
      { title: 'Center Table Concepts', img: getIdeaImage('living-room', 7) },
      { title: 'Accent Corner Designs', img: getIdeaImage('living-room', 8) },
      { title: 'Wall Moulding & Trim', img: getIdeaImage('living-room', 9) },
      { title: 'Indoor Plants Integration', img: getIdeaImage('living-room', 10) },
      { title: 'Ambient LED Strips', img: getIdeaImage('living-room', 11) },
      { title: 'Gallery Art Walls', img: getIdeaImage('living-room', 12) }
    ]
  },
  'dining-area': {
    label: 'Dining Area',
    img: diningAreaImage,
    count: 12,
    cardDesc: 'Elegant dining setups for memorable meals',
    desc: 'Create memorable dining experiences at home. Our dining room designs range from intimate family setups to formal dining rooms worthy of every celebration.',
    ideas: [
      { title: '6-Seater Marble Table', img: getIdeaImage('dining-area', 1) },
      { title: 'Pendant Light Clusters', img: getIdeaImage('dining-area', 2) },
      { title: 'Bench Seating Concepts', img: getIdeaImage('dining-area', 3) },
      { title: 'Built-in Crockery Cabinets', img: getIdeaImage('dining-area', 4) },
      { title: 'Accent Wallpaper', img: getIdeaImage('dining-area', 5) },
      { title: 'Round Dining Setups', img: getIdeaImage('dining-area', 6) },
      { title: 'Mirrored Feature Walls', img: getIdeaImage('dining-area', 7) },
      { title: 'Earthy Wooden Tables', img: getIdeaImage('dining-area', 8) },
      { title: 'Upholstered Dining Chairs', img: getIdeaImage('dining-area', 9) },
      { title: 'Integrated Dining Bar', img: getIdeaImage('dining-area', 10) },
      { title: 'Wash Basin Integration', img: getIdeaImage('dining-area', 11) },
      { title: 'Compact Foldable Dining', img: getIdeaImage('dining-area', 12) }
    ]
  },
  'foyer-area': {
    label: 'Foyer Area',
    img: foyerAreaImage,
    count: 12,
    cardDesc: 'Grand entrances that make a lasting first impression',
    desc: 'Your entryway makes the first impression. We design foyers that are grand, functional, and set the tone for the rest of your home, from compact apartments to sprawling villas.',
    ideas: [
      { title: 'Console Table Styling', img: getIdeaImage('foyer-area', 1) },
      { title: 'Statement Mirror Designs', img: getIdeaImage('foyer-area', 2) },
      { title: 'Shoe Cabinet Integration', img: getIdeaImage('foyer-area', 3) },
      { title: 'Accent Wall paneling', img: getIdeaImage('foyer-area', 4) },
      { title: 'Key & Mail Organizers', img: getIdeaImage('foyer-area', 5) },
      { title: 'Pendant Light Entryway', img: getIdeaImage('foyer-area', 6) },
      { title: 'Compact Bench Seating', img: getIdeaImage('foyer-area', 7) },
      { title: 'Marble Flooring Patterns', img: getIdeaImage('foyer-area', 8) },
      { title: 'Art Gallery Entryway', img: getIdeaImage('foyer-area', 9) },
      { title: 'Vertical Planter Partition', img: getIdeaImage('foyer-area', 10) },
      { title: 'Scent & Diffuser Nooks', img: getIdeaImage('foyer-area', 11) },
      { title: 'Coat & Umbrella Stands', img: getIdeaImage('foyer-area', 12) }
    ]
  },
  'kids-bedroom': {
    label: "Kids' Bedroom",
    img: kidsBedroomImage,
    count: 12,
    cardDesc: 'Fun, functional spaces that grow with your child',
    desc: "Design a space that sparks imagination and grows with your child. From playful nurseries to functional teen rooms, we create safe, fun, and organized bedrooms your kids will love.",
    ideas: [
      { title: 'Bunk Bed Designs', img: getIdeaImage('kids-bedroom', 1) },
      { title: 'Study Table Setups', img: getIdeaImage('kids-bedroom', 2) },
      { title: 'Themed Bed Concepts', img: getIdeaImage('kids-bedroom', 3) },
      { title: 'Colorful Toy Cubbies', img: getIdeaImage('kids-bedroom', 4) },
      { title: 'Wall Mural Paintings', img: getIdeaImage('kids-bedroom', 5) },
      { title: 'Cozy Reading Teepees', img: getIdeaImage('kids-bedroom', 6) },
      { title: 'Chalkboard Walls', img: getIdeaImage('kids-bedroom', 7) },
      { title: 'Modular Wardrobe for Kids', img: getIdeaImage('kids-bedroom', 8) },
      { title: 'Interactive Play Mats', img: getIdeaImage('kids-bedroom', 9) },
      { title: 'Ceiling Glow Stars', img: getIdeaImage('kids-bedroom', 10) },
      { title: 'Secret Storage Benches', img: getIdeaImage('kids-bedroom', 11) },
      { title: 'Creative Art Display Rails', img: getIdeaImage('kids-bedroom', 12) }
    ]
  },
  'master-bedroom': {
    label: 'Master Bedroom',
    img: masterBedroomImage,
    count: 12,
    cardDesc: 'Luxury bedrooms, custom wardrobes, relaxing ambiance',
    desc: 'Your master bedroom should be a true sanctuary. We design restful, beautiful spaces with luxurious textures, bespoke wardrobes, and perfect lighting that promotes sleep and relaxation.',
    ideas: [
      { title: 'King Bed Headboard Designs', img: getIdeaImage('master-bedroom', 1) },
      { title: 'Walk-in Wardrobe Concepts', img: getIdeaImage('master-bedroom', 2) },
      { title: 'Accent Wall Panel Ideas', img: getIdeaImage('master-bedroom', 3) },
      { title: 'Cove Lighting Ceilings', img: getIdeaImage('master-bedroom', 4) },
      { title: 'Bedside Panel Designs', img: getIdeaImage('master-bedroom', 5) },
      { title: 'Window Treatment Ideas', img: getIdeaImage('master-bedroom', 6) },
      { title: 'Cozy Reading Nooks', img: getIdeaImage('master-bedroom', 7) },
      { title: 'Master Bath Integration', img: getIdeaImage('master-bedroom', 8) },
      { title: 'Floating Dressing Vanity', img: getIdeaImage('master-bedroom', 9) },
      { title: 'Plush Bench Ottoman', img: getIdeaImage('master-bedroom', 10) },
      { title: 'Textured Rug Under Bed', img: getIdeaImage('master-bedroom', 11) },
      { title: 'Smart Home Automation', img: getIdeaImage('master-bedroom', 12) }
    ]
  },
  'parents-bedroom': {
    label: "Parents' Bedroom",
    img: parentsBedroomImage,
    count: 12,
    cardDesc: 'Comfortable, accessible rooms with peaceful aesthetics',
    desc: "A thoughtfully designed bedroom for parents prioritizing comfort, accessibility, and safety. Soft colors, anti-slip textures, and convenient lighting controls make it a peaceful, perfect retreat.",
    ideas: [
      { title: 'Ergonomic Low Bed', img: getIdeaImage('parents-bedroom', 1) },
      { title: 'Warm Ambient Lighting', img: getIdeaImage('parents-bedroom', 2) },
      { title: 'Anti-Skid Flooring', img: getIdeaImage('parents-bedroom', 3) },
      { title: 'Comfortable Armchair', img: getIdeaImage('parents-bedroom', 4) },
      { title: 'Spacious Wardrobes', img: getIdeaImage('parents-bedroom', 5) },
      { title: 'Bedside Panic Buttons', img: getIdeaImage('parents-bedroom', 6) },
      { title: 'Prayer or Meditative Corner', img: getIdeaImage('parents-bedroom', 7) },
      { title: 'Window Daybed Seating', img: getIdeaImage('parents-bedroom', 8) },
      { title: 'Emergency Nightlights', img: getIdeaImage('parents-bedroom', 9) },
      { title: 'No-Sharp-Edge Furniture', img: getIdeaImage('parents-bedroom', 10) },
      { title: 'Tv Panel Integration', img: getIdeaImage('parents-bedroom', 11) },
      { title: 'Earthy Color Palettes', img: getIdeaImage('parents-bedroom', 12) }
    ]
  },
  'guest-bedroom': {
    label: 'Guest Bedroom',
    img: guestBedroomImage,
    count: 12,
    cardDesc: 'Hotel-quality guest rooms for unforgettable stays',
    desc: 'Give your guests the luxury hotel experience. Our guest bedroom designs focus on comfort, warmth and thoughtful details that make visitors feel truly at home.',
    ideas: [
      { title: 'Hotel-Style Bed Setups', img: getIdeaImage('guest-bedroom', 1) },
      { title: 'Multi-functional Desk', img: getIdeaImage('guest-bedroom', 2) },
      { title: 'Compact Wardrobe Ideas', img: getIdeaImage('guest-bedroom', 3) },
      { title: 'Neutral Palette Concepts', img: getIdeaImage('guest-bedroom', 4) },
      { title: 'Bedside Charging Hubs', img: getIdeaImage('guest-bedroom', 5) },
      { title: 'Storage Ottomans', img: getIdeaImage('guest-bedroom', 6) },
      { title: 'Luggage Rack Nooks', img: getIdeaImage('guest-bedroom', 7) },
      { title: 'Blackout Window Curtains', img: getIdeaImage('guest-bedroom', 8) },
      { title: 'Wall-mounted Reading Lights', img: getIdeaImage('guest-bedroom', 9) },
      { title: 'Mini Refreshment Station', img: getIdeaImage('guest-bedroom', 10) },
      { title: 'Floating Display Shelves', img: getIdeaImage('guest-bedroom', 11) },
      { title: 'Under-Bed Storage Drawers', img: getIdeaImage('guest-bedroom', 12) }
    ]
  },
  'home-office': {
    label: 'Home Office Room',
    img: homeOfficeImage,
    count: 12,
    cardDesc: 'Productive, ergonomic workspaces at home',
    desc: 'Work smarter, not harder. Our home office designs create productive, ergonomic spaces that reduce fatigue and inspire focus, all without sacrificing style.',
    ideas: [
      { title: 'Built-in Bookshelf Desks', img: getIdeaImage('home-office', 1) },
      { title: 'Ergonomic Chair Setups', img: getIdeaImage('home-office', 2) },
      { title: 'Dual Monitor Arrangements', img: getIdeaImage('home-office', 3) },
      { title: 'Smart Cable Organizers', img: getIdeaImage('home-office', 4) },
      { title: 'Acoustic Wall Panels', img: getIdeaImage('home-office', 5) },
      { title: 'Biophilic Green Walls', img: getIdeaImage('home-office', 6) },
      { title: 'Sofa Seating Nooks', img: getIdeaImage('home-office', 7) },
      { title: 'Adjustable Standing Desks', img: getIdeaImage('home-office', 8) },
      { title: 'Pinboard & Whiteboard Walls', img: getIdeaImage('home-office', 9) },
      { title: 'Task Lamp Spotlights', img: getIdeaImage('home-office', 10) },
      { title: 'Under-Desk footrests', img: getIdeaImage('home-office', 11) },
      { title: 'Hidden Printer Cabinets', img: getIdeaImage('home-office', 12) }
    ]
  },
  balcony: {
    label: 'Balcony / Sit-out Areas',
    img: balconyImage,
    count: 12,
    cardDesc: 'Transform your balcony into a relaxing retreat',
    desc: 'Your balcony is a private outdoor escape. We transform small outdoor spaces into beautiful retreats with clever furniture, vertical gardens, and ambient lighting.',
    ideas: [
      { title: 'Cozy Swing Chairs', img: getIdeaImage('balcony', 1) },
      { title: 'Vertical Garden Walls', img: getIdeaImage('balcony', 2) },
      { title: 'String Light Styling', img: getIdeaImage('balcony', 3) },
      { title: 'Wooden Deck Flooring', img: getIdeaImage('balcony', 4) },
      { title: 'Folding Furniture Setups', img: getIdeaImage('balcony', 5) },
      { title: 'Balcony Bar Counters', img: getIdeaImage('balcony', 6) },
      { title: 'Privacy Bamboo Screens', img: getIdeaImage('balcony', 7) },
      { title: 'Grass Turf Floor Mats', img: getIdeaImage('balcony', 8) },
      { title: 'Coffee Table Sets', img: getIdeaImage('balcony', 9) },
      { title: 'Weather-Resistant storage', img: getIdeaImage('balcony', 10) },
      { title: 'Potted Plant Clusters', img: getIdeaImage('balcony', 11) },
      { title: 'Outdoor Floor Pillows', img: getIdeaImage('balcony', 12) }
    ]
  },
  bathroom: {
    label: 'Bathroom',
    img: bathroomImage,
    count: 12,
    cardDesc: 'Spa-style bathrooms, premium fixtures, marble finishes',
    desc: 'Transform your bathroom into a spa-like retreat. Our designs focus on premium materials, smart layouts, and luxurious fixtures that make every morning feel indulgent.',
    ideas: [
      { title: 'Floating Vanity Designs', img: getIdeaImage('bathroom', 1) },
      { title: 'Frameless Glass Showers', img: getIdeaImage('bathroom', 2) },
      { title: 'Backlit LED Mirrors', img: getIdeaImage('bathroom', 3) },
      { title: 'Marble Wall Panels', img: getIdeaImage('bathroom', 4) },
      { title: 'Matte Black Fixtures', img: getIdeaImage('bathroom', 5) },
      { title: 'Niche Wall Shelves', img: getIdeaImage('bathroom', 6) },
      { title: 'Rain Shower Setups', img: getIdeaImage('bathroom', 7) },
      { title: 'Freestanding Bathtubs', img: getIdeaImage('bathroom', 8) },
      { title: 'Pebble Tile Flooring', img: getIdeaImage('bathroom', 9) },
      { title: 'Wooden Slats Ceiling', img: getIdeaImage('bathroom', 10) },
      { title: 'Smart Toilet Integration', img: getIdeaImage('bathroom', 11) },
      { title: 'Laundry Basket Nooks', img: getIdeaImage('bathroom', 12) }
    ]
  }
}

export const DESIGN_IDEA_CATEGORIES = Object.entries(ROOM_DATA).map(([id, room]) => ({
  id,
  label: room.label,
  img: room.img,
  desc: room.cardDesc,
  count: room.count,
}))
