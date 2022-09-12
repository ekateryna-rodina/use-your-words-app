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
    const response = await db.Tag.bulkCreate(tags.map((t) => ({ name: t })));
    return response.map((v: { dataValues: any }) => v.dataValues);
  } catch (error) {
    console.log(error);
  }
};

export { fetchTags, postTags };
