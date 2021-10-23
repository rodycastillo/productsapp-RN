
export interface LoginResponse {
    usuario: Usuario;
    token:   string;
}

export interface renoveJWT {
    usuario: Usuario;
    token:   string;
}

export interface RegisterResponse {
    usuario: Usuario;
    token:   string;
}

export interface Usuario {
    rol:    string;
    estado: boolean;
    google: boolean;
    nombre: string;
    correo: string;
    uid:    string;
    img?:   string;
}

export interface LoginData {
    correo:  string;
    password:string;
}

export interface RegisterData {
    correo:  string;
    password:string;
    nombre:  string;
}