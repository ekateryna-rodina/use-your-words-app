import db from "../models";

const fetchTags = async () => {
  try {
    const tagDtos = await db.Tag.findAll({});
    const tags = tagDtos.map((dto) => dto.dataValues);
    return tags;
  } catch (error) {
    console.log(error);
  }
};

const postTags = async (tags: string[]) => {
  try {
    db.Tag.bulkCreate(tags.map((t) => ({ name: t })));
  } catch (error) {
    console.log(error);
  }
};

export { fetchTags, postTags };
