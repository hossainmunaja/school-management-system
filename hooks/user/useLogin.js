import PocketBase from 'pocketbase';
import { pb } from "../../libs/pocketbase";
import useSWRMutation from "swr/mutation";

const login = async (key, { arg }) => {
  const { email, password } = arg;
  console.log("it is coming");
  console.log(pb.authStore.isValid);
  const authData = await pb
    .collection("users")
    .authWithPassword(email, password);
    console.log("again i find it");
  return authData;
};

export default function useLogin() {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "UserLogin",
    login
  );

  return {
    trigger,
    data,
    error,
    isMutating,
  };
}
