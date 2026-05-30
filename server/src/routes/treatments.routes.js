import express from "express";

const router = express.Router();

// --- Mock treatment catalog (keyed by slug) ---
// Each treatment has its own unique copy, durations, costs, types,
// benefits, things-to-consider, fallback products and nearby clinics.
const TREATMENTS = {
    braces: {
        slug: "braces",
        title: "Orthodontic Braces",
        category: "Alignment",
        sectionLabel: "Types of Braces",
        chatTopic: "braces",
        description:
            "Comprehensive structural alignment solutions for a perfectly straight, healthy smile. Ideal for correcting overbites, underbites, and severe crowding.",
        duration: "12 - 24 Months",
        cost: { min: 15000, max: 45000 },
        types: [
            { name: "Traditional Metal Braces", desc: "High-grade stainless steel brackets and wires that move teeth predictably.", target: "Best for: Severe crowding & complex cases." },
            { name: "Ceramic (Clear) Braces", desc: "Tooth-colored brackets that blend in with your enamel.", target: "Best for: Adults seeking a discreet option." },
            { name: "Lingual Braces", desc: "Custom brackets bonded to the back of the teeth, invisible from the front.", target: "Best for: Maximum aesthetic discretion." },
        ],
        benefits: ["Improves bite function", "Makes teeth easier to clean", "Corrects jaw alignment", "Permanent, stable aesthetic result"],
        sideEffects: ["Mild soreness after adjustments", "Requires diligent oral hygiene", "Some dietary restrictions", "Brief initial speech adjustment"],
        products: [
            { id: 1, name: "Orthodontic Wax", price: 45, desc: "Relieves irritation from brackets and wires." },
            { id: 2, name: "Interdental Brushes", price: 75, desc: "Essential for cleaning around wires." },
        ],
        localClinics: [
            { id: 1, name: "Kumasi Premier Dental", address: "Bantama High St", distance: "1.2 km", rating: 4.8, reviews: 124, estPrice: 15500 },
            { id: 2, name: "Oforikrom Smile Clinic", address: "Accra Rd, Oforikrom", distance: "3.5 km", rating: 4.6, reviews: 89, estPrice: 14200 },
        ],
    },

    aligners: {
        slug: "aligners",
        title: "Clear Aligners",
        category: "Alignment",
        sectionLabel: "Aligner Options",
        chatTopic: "clear aligners",
        description:
            "Virtually invisible, removable trays that gradually straighten your teeth without metal brackets. The modern, low-profile path to a confident smile.",
        duration: "6 - 18 Months",
        cost: { min: 18000, max: 50000 },
        types: [
            { name: "Full Arch Aligners", desc: "A complete series of trays correcting both upper and lower arches.", target: "Best for: Moderate alignment issues." },
            { name: "Express / Touch-Up Trays", desc: "A short series for minor corrections or post-braces relapse.", target: "Best for: Small cosmetic fixes." },
            { name: "Night-Only Aligners", desc: "Worn only while you sleep for a discreet daytime experience.", target: "Best for: Busy professionals." },
        ],
        benefits: ["Removable for eating & cleaning", "Nearly invisible appearance", "No dietary restrictions", "Fewer in-person appointments"],
        sideEffects: ["Requires 20-22 hrs/day wear", "Temporary lisp when adjusting", "Easy to misplace if removed", "Discipline-dependent results"],
        products: [
            { id: 1, name: "Aligner Cleaning Crystals", price: 90, desc: "Keeps trays clear and odor-free." },
            { id: 2, name: "Aligner Removal Tool", price: 35, desc: "Pops trays off without damaging nails." },
            { id: 3, name: "Chewies", price: 25, desc: "Helps trays seat fully for a precise fit." },
        ],
        localClinics: [
            { id: 1, name: "Ashanti Orthodontics", address: "Adum, Kumasi", distance: "2.1 km", rating: 4.9, reviews: 156, estPrice: 22000 },
            { id: 2, name: "Bright Align Studio", address: "Asokwa, Kumasi", distance: "4.0 km", rating: 4.7, reviews: 73, estPrice: 19500 },
        ],
    },

    whitening: {
        slug: "whitening",
        title: "Teeth Whitening",
        category: "Cosmetic",
        sectionLabel: "Whitening Methods",
        chatTopic: "teeth whitening",
        description:
            "Professional-grade brightening that lifts years of stains from coffee, tea and aging. Fast, dramatic results for a radiant smile.",
        duration: "1 - 3 Sessions",
        cost: { min: 1200, max: 6000 },
        types: [
            { name: "In-Office Laser Whitening", desc: "High-concentration gel activated by light for instant results.", target: "Best for: Fastest, most dramatic lift." },
            { name: "Custom Take-Home Trays", desc: "Dentist-made trays with professional gel for gradual whitening.", target: "Best for: Controlled, budget-friendly results." },
            { name: "Combination Treatment", desc: "An in-office boost followed by take-home maintenance.", target: "Best for: Long-lasting brightness." },
        ],
        benefits: ["Visible results in one visit", "Boosts confidence instantly", "Non-invasive procedure", "Customizable shade level"],
        sideEffects: ["Temporary tooth sensitivity", "Possible gum irritation", "Results fade without upkeep", "Not effective on crowns/veneers"],
        products: [
            { id: 1, name: "Sensitivity Relief Gel", price: 120, desc: "Soothes teeth after whitening sessions." },
            { id: 2, name: "Whitening Maintenance Pen", price: 95, desc: "Touch-up brightness on the go." },
        ],
        localClinics: [
            { id: 1, name: "Glow Dental Aesthetics", address: "Ahodwo, Kumasi", distance: "1.8 km", rating: 4.8, reviews: 201, estPrice: 2500 },
            { id: 2, name: "Pearl White Clinic", address: "Nhyiaeso, Kumasi", distance: "3.2 km", rating: 4.5, reviews: 64, estPrice: 1800 },
        ],
    },

    veneers: {
        slug: "veneers",
        title: "Porcelain Veneers",
        category: "Cosmetic",
        sectionLabel: "Veneer Types",
        chatTopic: "porcelain veneers",
        description:
            "Ultra-thin, custom-crafted shells bonded to the front of your teeth to transform shape, color and symmetry into a flawless, premium smile.",
        duration: "2 - 4 Weeks",
        cost: { min: 8000, max: 30000 },
        types: [
            { name: "Porcelain Veneers", desc: "Stain-resistant, lifelike shells that last 10-15 years.", target: "Best for: Long-term, natural results." },
            { name: "Composite Veneers", desc: "Resin sculpted directly onto the tooth in a single visit.", target: "Best for: Budget-conscious, quick fixes." },
            { name: "No-Prep Veneers", desc: "Minimal enamel removal for a reversible enhancement.", target: "Best for: Preserving natural tooth structure." },
        ],
        benefits: ["Instant smile makeover", "Highly stain-resistant", "Natural, translucent finish", "Corrects chips, gaps & shape"],
        sideEffects: ["Often irreversible (enamel removal)", "Possible sensitivity to temperature", "May need replacement over time", "Higher upfront investment"],
        products: [
            { id: 1, name: "Non-Abrasive Toothpaste", price: 85, desc: "Protects the polish of your veneers." },
            { id: 2, name: "Night Guard", price: 350, desc: "Shields veneers from grinding damage." },
        ],
        localClinics: [
            { id: 1, name: "Elite Smile Designers", address: "Ridge, Kumasi", distance: "2.6 km", rating: 4.9, reviews: 98, estPrice: 12000 },
            { id: 2, name: "Aesthetica Dental", address: "Danyame, Kumasi", distance: "5.1 km", rating: 4.7, reviews: 55, estPrice: 9500 },
        ],
    },

    implants: {
        slug: "implants",
        title: "Dental Implants",
        category: "Surgical",
        sectionLabel: "Implant Solutions",
        chatTopic: "dental implants",
        description:
            "Permanent titanium tooth-root replacements topped with lifelike crowns. The gold standard for restoring missing teeth and full chewing function.",
        duration: "3 - 6 Months",
        cost: { min: 20000, max: 70000 },
        types: [
            { name: "Single Tooth Implant", desc: "One titanium post and crown to replace a single missing tooth.", target: "Best for: Isolated tooth loss." },
            { name: "Implant-Supported Bridge", desc: "Two implants anchoring a bridge across several teeth.", target: "Best for: Multiple adjacent gaps." },
            { name: "All-on-4 Full Arch", desc: "Four implants supporting a complete fixed arch of teeth.", target: "Best for: Full-mouth restoration." },
        ],
        benefits: ["Permanent, fixed solution", "Preserves jawbone density", "Restores full bite strength", "Looks and feels natural"],
        sideEffects: ["Requires minor oral surgery", "Several months of healing", "Needs sufficient bone density", "Highest cost tier"],
        products: [
            { id: 1, name: "Water Flosser", price: 480, desc: "Cleans around implants and gumline." },
            { id: 2, name: "Antimicrobial Rinse", price: 110, desc: "Protects implant sites during healing." },
        ],
        localClinics: [
            { id: 1, name: "Implant Centre Kumasi", address: "KNUST Rd, Kumasi", distance: "3.9 km", rating: 4.9, reviews: 142, estPrice: 28000 },
            { id: 2, name: "Restore Oral Surgery", address: "Santasi, Kumasi", distance: "6.4 km", rating: 4.6, reviews: 71, estPrice: 24500 },
        ],
    },

    dentures: {
        slug: "dentures",
        title: "Dentures",
        category: "Restorative",
        sectionLabel: "Denture Options",
        chatTopic: "dentures",
        description:
            "Comfortable, custom-fitted removable replacements for missing teeth that restore your smile, speech and ability to eat with confidence.",
        duration: "3 - 6 Weeks",
        cost: { min: 4000, max: 22000 },
        types: [
            { name: "Complete Dentures", desc: "A full set replacing all teeth in an arch.", target: "Best for: Total tooth loss." },
            { name: "Partial Dentures", desc: "Fills gaps while clasping onto remaining natural teeth.", target: "Best for: Several missing teeth." },
            { name: "Implant-Retained Dentures", desc: "Snap securely onto a few implants for extra stability.", target: "Best for: A more secure, no-slip fit." },
        ],
        benefits: ["Affordable tooth replacement", "Restores facial structure", "Improves speech & chewing", "Removable for easy cleaning"],
        sideEffects: ["Adjustment period required", "May need periodic relining", "Can slip without adhesive", "Avoid very sticky foods"],
        products: [
            { id: 1, name: "Denture Adhesive Cream", price: 65, desc: "Secures dentures throughout the day." },
            { id: 2, name: "Denture Soak Tablets", price: 80, desc: "Deep-cleans and freshens overnight." },
        ],
        localClinics: [
            { id: 1, name: "Comfort Dental Prosthetics", address: "Tafo, Kumasi", distance: "4.7 km", rating: 4.5, reviews: 60, estPrice: 6500 },
            { id: 2, name: "New Smile Denture Lab", address: "Suame, Kumasi", distance: "5.9 km", rating: 4.4, reviews: 48, estPrice: 5200 },
        ],
    },

    fillings: {
        slug: "fillings",
        title: "Cavity Fillings",
        category: "Preventative",
        sectionLabel: "Filling Materials",
        chatTopic: "cavity fillings",
        description:
            "Quick, tooth-saving restorations that remove decay and seal cavities, stopping pain and preventing further damage in a single visit.",
        duration: "30 - 60 Minutes",
        cost: { min: 300, max: 2500 },
        types: [
            { name: "Composite (Tooth-Colored)", desc: "Resin matched to your enamel for an invisible repair.", target: "Best for: Visible front teeth." },
            { name: "Amalgam (Silver)", desc: "Durable metal alloy filling for heavy-use molars.", target: "Best for: Back teeth on a budget." },
            { name: "Ceramic Inlays/Onlays", desc: "Lab-made porcelain for larger areas of decay.", target: "Best for: Strength + aesthetics." },
        ],
        benefits: ["Stops decay immediately", "Relieves toothache", "Restores normal chewing", "Completed in one visit"],
        sideEffects: ["Brief numbness after anesthetic", "Short-term sensitivity", "Amalgam is visibly silver", "Very large cavities may need a crown"],
        products: [
            { id: 1, name: "Fluoride Toothpaste", price: 40, desc: "Strengthens enamel against new decay." },
            { id: 2, name: "Xylitol Sugar-Free Gum", price: 30, desc: "Reduces cavity-causing bacteria." },
        ],
        localClinics: [
            { id: 1, name: "Family Care Dental", address: "Asylum Down, Kumasi", distance: "1.5 km", rating: 4.7, reviews: 188, estPrice: 600 },
            { id: 2, name: "QuickFix Dental Clinic", address: "Bantama, Kumasi", distance: "2.9 km", rating: 4.5, reviews: 95, estPrice: 450 },
        ],
    },

    "wisdom-teeth": {
        slug: "wisdom-teeth",
        title: "Wisdom Teeth Removal",
        category: "Surgical",
        sectionLabel: "Extraction Types",
        chatTopic: "wisdom teeth removal",
        description:
            "Safe surgical removal of impacted or problematic third molars to relieve pain, prevent crowding and protect your overall oral health.",
        duration: "45 - 90 Minutes",
        cost: { min: 2000, max: 15000 },
        types: [
            { name: "Simple Extraction", desc: "Removal of a fully erupted, accessible wisdom tooth.", target: "Best for: Teeth above the gumline." },
            { name: "Surgical Extraction", desc: "Incision-based removal of partially erupted teeth.", target: "Best for: Partially impacted molars." },
            { name: "Impacted Tooth Surgery", desc: "Removal of teeth fully trapped in bone or gum.", target: "Best for: Severe impaction cases." },
        ],
        benefits: ["Relieves pressure & pain", "Prevents future crowding", "Stops recurring infections", "Protects neighboring molars"],
        sideEffects: ["Swelling for a few days", "Soft-food diet during recovery", "Risk of dry socket", "Temporary jaw stiffness"],
        products: [
            { id: 1, name: "Cold Compress Pack", price: 55, desc: "Reduces post-surgery swelling." },
            { id: 2, name: "Saltwater Rinse Kit", price: 40, desc: "Keeps extraction sites clean." },
        ],
        localClinics: [
            { id: 1, name: "Oral Surgery Specialists", address: "Ridge, Kumasi", distance: "3.1 km", rating: 4.8, reviews: 110, estPrice: 4500 },
            { id: 2, name: "Maxillofacial Care Centre", address: "Asokwa, Kumasi", distance: "5.5 km", rating: 4.6, reviews: 67, estPrice: 3800 },
        ],
    },
};

// Numeric-id fallback (legacy support: /api/treatments/1 -> braces)
const ID_ALIAS = { 1: "braces", 2: "aligners", 3: "whitening", 4: "veneers", 5: "implants", 6: "dentures", 7: "fillings", 8: "wisdom-teeth" };

// List endpoint: lightweight catalog summary
router.get("/", (req, res) => {
    res.json(
        Object.values(TREATMENTS).map(({ slug, title, category, description, duration, cost }) => ({
            slug,
            title,
            category,
            description,
            duration,
            cost,
        }))
    );
});

router.get("/:id", (req, res) => {
    const rawId = req.params.id;
    const slug = TREATMENTS[rawId] ? rawId : ID_ALIAS[rawId];

    if (!slug) {
        return res.status(404).json({ error: "Treatment not found", id: rawId });
    }

    res.json(TREATMENTS[slug]);
});

export default router;
