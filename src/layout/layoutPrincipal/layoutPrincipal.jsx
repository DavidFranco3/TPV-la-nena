import { useState, useEffect, Fragment } from 'react';
import {Image, Button} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import LogoLANENA from "../../assets/jpg/logo-la-nena-2.jpg";
import ImagenPerfil from "../../assets/png/user-avatar.png";
import "../../scss/styles.scss";
import { getTokenApi, isExpiredToken, logoutApi, obtenidusuarioLogueado } from '../../api/auth';
import { obtenerUsuario } from "../../api/usuarios";
import { LogsInformativosLogout } from "../../components/Logs/LogsSistema/LogsSistema";

function LayoutPrincipal(props) {
    const { setRefreshCheckLogin, children } = props;

    const redirecciona = useNavigate();

    const [datosUsuario, setDatosUsuario] = useState("");

    const obtenerDatosUsuario = () => {
        try {
            obtenerUsuario(obtenidusuarioLogueado(getTokenApi())).then(response => {
                const { data } = response;
                //console.log(data)
                setDatosUsuario(data);
            }).catch((e) => {
                console.log(e);
            })
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        obtenerDatosUsuario();
    }, []);

    const cierreAutomatico = () => {
        LogsInformativosLogout("Sesión finalizada", datosUsuario, setRefreshCheckLogin);
        logoutApi();
        setRefreshCheckLogin(true);
        toast.success("Sesión cerrada");
    }

    //Para cerrar la sesion
    const cerrarSesion = () => {
        cierreAutomatico();
    }

    // Cerrado de sesión automatico
    useEffect(() => {
        if (getTokenApi()) {
            if (isExpiredToken(getTokenApi())) {
                LogsInformativosLogout("Sesión finalizada", datosUsuario, setRefreshCheckLogin);
                logoutApi();
                setRefreshCheckLogin(true);
                toast.warning("Sesión expirada");
                toast.success("Sesión cerrada por seguridad");
            }
        }
    }, []);
    // Termina cerrado de sesión automatico

    // Para ir hacia el inicio
    const enrutaInicio = () => {
        redirecciona("/")
    }

    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between h-16">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <Image
                                                src={LogoLANENA}
                                                width="125px"
                                                alt="Workflow"
                                                title="Volver al menu principal"
                                                className="logoPrincipal"
                                                onClick={() => {
                                                    enrutaInicio()
                                                }}
                                            />
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {/* Navegacion */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="ml-3 relative">
                                                <div>
                                                    <Menu.Button title="Desplegar el boton de cierre de sesión" className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                        <span className="sr-only">Open user menu</span>
                                                        <Image className="h-8 w-8 rounded-full" src={ImagenPerfil} alt="" />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {({ active }) => (
                                                            <Button
                                                                title="Cerrar sesión"
                                                                onClick={() => {
                                                                    cerrarSesion()
                                                                }}
                                                                className="cerrarSesion"
                                                            >
                                                                Cerrar sesion
                                                            </Button>
                                                        )}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                    {/* navegacion */}
                                </div>
                                <div className="pt-4 pb-3 border-t border-gray-700">
                                    <div className="flex items-center px-5">
                                        {/* Incluir desplegable */}
                                        <div className="flex-shrink-0">
                                            <Image
                                                //className="logoPrincipal"
                                                className="h-8 w-8 rounded-full"
                                                src={ImagenPerfil}
                                                alt="Imagen del perfil"
                                                onClick={() => {
                                                    enrutaInicio()
                                                }}
                                            />
                                        </div>
                                        <div className="ml-3">
                                            {/*<div className="text-base font-medium leading-none text-white">{user.name}</div>*/}
                                            {/*<div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>*/}
                                        </div>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                {children}
            </div>
        </>
    );
}

export default LayoutPrincipal;