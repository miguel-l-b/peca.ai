export default class BigIntHelper {
    public static convertBigIntToString(data: object): object {
        return JSON.parse(JSON.stringify(data, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ))
    }
}