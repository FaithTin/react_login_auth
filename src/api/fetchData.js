import axios from "axios";
import { accessManagement as iam } from "../utils";

export const fetchData = axios.create({
    baseURL: "http://malih-auth.ap-southeast-2.elasticbeanstalk.com/api/v1",
});


fetchData.interceptors.request.use(
    (config) => {
        const tokenType = iam.tokenType.get() ? iam.tokenType.get() : "";
        const accessToken = iam.token.get() ? iam.token.get() : "";
        const tenantReference = iam.tenantReference.get()
            ? iam.tenantReference.get()
            : "";
        config.headers.Authorization = 
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYWxpaG1haWx0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTY0NDgxNTg5NiwiZXhwIjoxNjQ0OTAyMjk2fQ.xjoQzVMuVCygYl5PebO184ndfq8nZ9Vhnb-OC21rD47bKEw-y8u3xftUGxDCM_QAxtqW9ftbcSYhA5_FEwBjBQ";
        config.headers.tenantReference = tenantReference;
        return config;
    },
    (err) => new Promise.reject(err)
);
