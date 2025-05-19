import axios from "axios";
import type { User } from "@/types";

export const registerNewUser = async (userinfo: User) => {
    try {
        const response = await axios.post('/api/user/register', userinfo);
        return response;
    } catch (error) {
        return {
            status: 500,
            data: [],
            message: "注册失败！"
        };
    }
}