declare module 'hello-webpack'
declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}