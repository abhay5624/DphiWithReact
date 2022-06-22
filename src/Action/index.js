export const DeleteAction = (data) => {
  return {
    type: "DELETE_DATA",
    payload: data,
  };
};
export const CreateAction = (data) => {
  return {
    type: "CREATE_DATA",
    payload: data,
  };
};
export const EditAction = (data) => {
  return {
    type: "EDIT_DATA",
    payload: data,
  };
};
