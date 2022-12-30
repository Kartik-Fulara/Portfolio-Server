import Portfolio from "../models/portfolio-data.models";

const insertData = async (data: any) => {
  const portfolio = await Portfolio.create(data);
  return portfolio;
};

const getAllData = async () => {
  const portfolio = await Portfolio.find();
  return portfolio;
};

const getDataByPages = async () => {
  const portfolio = await Portfolio.find().limit(4);
  return portfolio;
};

const editData = async (updatedData: any) => {
  const portfolio = await Portfolio.findOneAndUpdate(
    { id: updatedData.id },
    updatedData,
    {
      new: true,
      runValidators: true,
    }
  );
  return portfolio;
};

const getDataById = async (id: string) => {
  const portfolio = await Portfolio.findOne({ id: id });
  return portfolio;
};

const deleteData = async (id: string) => {
  const portfolio = await Portfolio.findOne({ id: id });

  if (portfolio) {
    await portfolio.remove();
  }

  return portfolio;
};

export { insertData, getAllData, editData, deleteData, getDataById };
