export interface API{
    api:string;
    query_params?:Array<{key:string, value: string}>;
    formData?: FormData;
}