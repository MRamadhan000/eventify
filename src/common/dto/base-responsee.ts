export class BaseResponseDto<T> {
    constructor(
        public message: string,
        public data?: T,
    ) { }

    static success<T>(
        message: string,
        data?: T,
    ): BaseResponseDto<T> {
        return new BaseResponseDto(
            message,
            data,
        );
    }

    static error(
        message: string,
    ): BaseResponseDto<null> {
        return new BaseResponseDto(
            message,
            null,
        );
    }
}