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

function Dashboard(props) {
  const { setRefreshCheckLogin } = props;

  const enrutamiento = useNavigate();

  const [estadoUsuario, setEstadoUsuario] = useState(null);
  const [datosUsuario, setDatosUsuario] = useState(null);

  useEffect(() => {
    try {
      obtenerUsuario(obtenidusuarioLogueado(getTokenApi())).then(response => {
        const { data } = response;
        const { admin } = data;
        //console.log(data)
        setEstadoUsuario(admin);
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
  }, []);

  // Cerrado de sesión automatico
  useEffect(() => {
    if (getTokenApi()) {
      if (isExpiredToken(getTokenApi())) {
        LogsInformativosLogout("Sesión finalizada", datosUsuario, setRefreshCheckLogin);
        logoutApi();
        setRefreshCheckLogin(true);
        toast.warning('Sesión expirada');
        toast.success('Sesión cerrada por seguridad');
      }
    }
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
      {
        estadoUsuario === "true" ?
          (
            <>
              <div className="grid grid-cols-4 gap-4">
                <ItemCard path={'/TerminalPV'}
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
                  path={'/Logs'}
                  logo={LogoLogs}
                  title={'Logs'}
                />
              </div>
            </>
          )
          :
          (
            <>
              <div className="grid grid-cols-3 gap-3">
                <ItemCard path={'/TerminalPV'}
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
              </div>
            </>
          )
      }
    </>
  )
}

export default Dashboard