import FileService from "../../services/FileService";
import StatusService from "../../services/StatusService";

export const SendFileController = async (request, response) => {
  try {
    if (request.file === undefined){
      throw new Error("File not found!")
    }
    let result = await new FileService().convertFIle(Buffer.from(request.file.buffer).toString("utf-8"));
    response
    .status(200)
    .json(
      StatusService.buildResponse(
      true,
      {result}
    ))
  } catch (error) {
    response.json(StatusService.buildError(error.message, error.status))
  }
}