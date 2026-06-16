import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
} from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Format email tidak valid' })
    @IsNotEmpty({ message: 'Email wajib diisi dan tidak boleh kosong' })
    @MaxLength(150, { message: 'Email tidak boleh lebih dari 150 karakter' })
    email!: string;


    @IsString({ message: 'Password harus berupa text' })
    @IsNotEmpty({ message: 'Password wajib diisi dan tidak boleh kosong', })
    @MaxLength(255, { message: 'Password terlalu panjang', })
    password!: string;
}