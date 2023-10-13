
export class ParametersEndpoints {
  getParameters() {
    return `parameter/get_parameters`;
  }

  editParameter(id) {
    return `parameter/edit_parameter/${id}`;
  }

}