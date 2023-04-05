import { useEffect, useState } from 'react';
import { getTokenApi, isExpiredToken, logoutApi, obtenidusuarioLogueado } from '../../api/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';
import { obtenerUsuario } from "../../api/usuarios";
import "../../scss/styles.scss";
import { LogsInformativosLogout } from '../../components/Logs/LogsSistema/LogsSistema';
// Importaciones de imagenes del dashboard
import LogoVentas from '../../assets/png/ventas.png';
import LogoHistorial from '../../assets/png/facturas.png';
import LogoProductos from '../../assets/png/productos.png';
import LogoCategorias from '../../assets/png/categorias.png';
import LogoUsuarios from '../../assets/png/usuarios.png';
import LogoCajas from '../../assets/png/cajas.png';
import LogoLogs from '../../assets/png/logs.png';
import LogoIngredientes from '../../assets/png/ingredientes.png';
import LogoPedidos from '../../assets/png/pedidos.png';
import LogoClientes from '../../assets/png/clientes.png';

function Dashboard(props) {
  const { setRefreshCheckLogin } = props;

  const enrutamiento = useNavigate();

  const [estadoUsuario, setEstadoUsuario] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [rolUsuario, setRolUsuario] = useState(null);
  const [datosUsuario, setDatosUsuario] = useState(null);

  const obtenerDatosUsuario = () => {
    try {
      obtenerUsuario(obtenidusuarioLogueado(getTokenApi())).then(response => {
        const { data } = response;
        const { admin, tipo, rol } = data;
        //console.log(data)
        setTipoUsuario(tipo);
        setEstadoUsuario(admin);
        setRolUsuario(rol);
        setDatosUsuario(data);
      }).catch((e) => {
        if (e.message === 'Network Error') {
          //console.log("No hay internet")
          toast.error("Conexión al servidor no disponible");
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    obtenerDatosUsuario();
  }, []);

  const cierreSesion = () => {
    if (getTokenApi()) {
      if (isExpiredToken(getTokenApi())) {
        LogsInformativosLogout("Sesión finalizada", datosUsuario, setRefreshCheckLogin);
        logoutApi();
        setRefreshCheckLogin(true);
        toast.warning('Sesión expirada');
        toast.success('Sesión cerrada por seguridad');
      }
    }
  }

  // Cerrado de sesión automatico
  useEffect(() => {
    cierreSesion();
  }, [])
  // Termina cerrado de sesión automatico

  const goTo = (ruta) => enrutamiento(ruta);

  const ItemCard = ({ path, logo, title }) => (
    <Card className="contenidoCentrado">
      <Card.Body onClick={() => goTo(path)}>
        <div className="flex flex-col items-center justify-center">
          <Image title={title} alt={title} src={logo} style={{ width: '100px' }} />
          <span className="inline-block text-lg font-normal">{title}</span>
        </div>
      </Card.Body>
    </Card>
  )

  return (
    <>
      {/*Vista del Dashboard para un usuario administrador*/}
      {
        estadoUsuario === "true" &&
        (
          <>
            <div className="grid grid-cols-5 gap-5">
              <ItemCard
                path={'/TerminalPV'}
                logo={LogoVentas}
                title={'Ventas'}
              />
              <ItemCard
                path={'/Historiales'}
                logo={LogoHistorial}
                title={'Historiales'}
              />
              <ItemCard
                path={'/Productos'}
                logo={LogoProductos}
                title={'Productos'}
              />
              <ItemCard
                path={'/Categorias'}
                logo={LogoCategorias}
                title={'Categorías'}
              />
              <ItemCard
                path={'/Ingredientes'}
                logo={LogoIngredientes}
                title={'Ingredientes'}
              />
              <ItemCard
                path={'/Cajas'}
                logo={LogoCajas}
                title={'Cajas'}
              />
              <ItemCard
                path={'/Usuarios'}
                logo={LogoUsuarios}
                title={'Usuarios'}
              />
              <ItemCard
                path={'/Clientes'}
                logo={LogoClientes}
                title={'Clientes'}
              />
              <ItemCard
                path={'/PedidosClientes'}
                logo={LogoPedidos}
                title={'Pedidos en línea'}
              />
              <ItemCard
                path={'/Logs'}
                logo={LogoLogs}
                title={'Logs'}
              />
            </div>
          </>
        )
      }
      {/*Vista del Dashboard para un usuario cajero*/}
      {
        estadoUsuario === "false" && rolUsuario === "vendedor" && tipoUsuario === "interno" &&
        (
          <>
            <div className="grid grid-cols-5 gap-5">
              <ItemCard
                path={'/TerminalPV'}
                logo={LogoVentas}
                title={'Ventas'}
              />
              <ItemCard
                path={'/Historiales'}
                logo={LogoHistorial}
                title={'Historiales'}
              />
              <ItemCard
                path={'/Cajas'}
                logo={LogoCajas}
                title={'Cajas'}
              />
              <ItemCard
                path={'/Clientes'}
                logo={LogoClientes}
                title={'Clientes'}
              />
              <ItemCard
                path={'/PedidosClientes'}
                logo={LogoPedidos}
                title={'Pedidos en línea'}
              />
            </div>
          </>
        )
      }
       {/*Vista del Dashboard para un usuario mesero*/}
       {
        estadoUsuario === "false" && rolUsuario === "mesero" && tipoUsuario === "interno" &&
        (
          <>
            <div className="grid grid-cols-1 gap-1">
              <ItemCard
                path={'/TerminalPV'}
                logo={LogoVentas}
                title={'Ventas'}
              />
              <ItemCard
                path={'/Historiales'}
                logo={LogoHistorial}
                title={'Historiales'}
              />
            </div>
          </>
        )
      }
      {/*Vista del Dashboard para un usuario cliente*/}
      {
        estadoUsuario === "false" && tipoUsuario === "externo" &&
        (
          <>
            <div className="grid grid-cols-1 gap-1">
              <ItemCard
                path={'/PedidosClientes'}
                logo={LogoPedidos}
                title={'Pedidos en línea'}
              />
            </div>
          </>
        )
      }
    </>
  );
}

export default Dashboard