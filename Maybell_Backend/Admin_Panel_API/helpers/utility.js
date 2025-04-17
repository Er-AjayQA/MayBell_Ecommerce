const slugify = require("slugify");

// Create Slug
const generateSlug = (name) => {
  return slugify(name, { lower: true, strict: true });
};

// Create Unique Slug
const generateUniqueSlug = async (modelName, baseSlug) => {
  let slug = baseSlug;
  let count = 0;

  while (await modelName.findOne({ slug })) {
    count++;
    slug = `${baseSlug}-${count}`;
  }

  return slug;
};

module.exports = { generateUniqueSlug, generateSlug };
