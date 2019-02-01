import axios from "axios";

import { ENV } from "../config/env";

/**
 * Api config in which uses axios create
 */

export default axios.create({
  baseURL: ENV.API_URL
});
