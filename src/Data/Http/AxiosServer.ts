import axios from 'axios';
import environment from '../../Core/Environment/environment.debug';

const AxiosServer = axios.create({
  baseURL: environment.host,
});

export default AxiosServer;
