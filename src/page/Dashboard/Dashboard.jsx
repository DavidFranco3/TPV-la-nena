import { useEffect, useState } from 'react';
import { getTokenApi, isExpiredToken, logoutApi, obtenidusuarioLogueado } from '../../api/auth';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Card, Container, CardGroup, Image } from 'react-bootstrap';
// Importaciones de imagenes del dashboard
import LogoVentas from '../../assets/png/ventas.png';
import LogoHistorial from '../../assets/png/facturas.png';
import LogoHistorialDia from '../../assets/png/historialDia.png';
import LogoHistorialMes from '../../assets/png/historialMes.png';
import LogoProductos from '../../assets/png/productos.png';
import LogoCategorias from '../../assets/png/categorias.png';
import { obtenerUsuario } from "../../api/usuarios";
import "../../scss/styles.scss";

function Dashboard(props) {
  const { setRefreshCheckLogin } = props;

  const enrutamiento = useHistory();

  // Cerrado de sesión automatico
  useEffect(() => {
    if (getTokenApi()) {
      if (isExpiredToken(getTokenApi())) {
        toast.warning('Sesión expirada');
        toast.success('Sesión cerrada por seguridad');
        logoutApi();
        setRefreshCheckLogin(true);
      }
    }
  }, [])
  // Termina cerrado de sesión automatico

  const [estadoUsuario, setEstadoUsuario] = useState("");

  useEffect(() => {
    try {
      obtenerUsuario(obtenidusuarioLogueado(getTokenApi())).then(response => {
        const { data } = response;
        const { admin } = data;
        //console.log(data)
        setEstadoUsuario(admin);
      }).catch((e) => {
        if (e.message === 'Network Error') {
          //console.log("No hay internet")
          toast.error("Conexión al servidor no disponible");

        }
      })
    } catch (e) {

    }
  }, []);

  const goTo = (ruta) => enrutamiento.push(ruta);

  const ItemCard = ({ path, logo, title }) => (
    <Card>
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
              <div className="grid grid-cols-3 gap-24">
                <ItemCard path={'/TerminalPV'}
                  logo={LogoVentas}
                  title={'Ventas'}
                />
                <ItemCard
                  path={'/Ventas'}
                  logo={LogoHistorial}
                  title={'Historial general'}
                />
                <ItemCard
                  path={'/HistoricoVentasDia'}
                  logo={LogoHistorialDia}
                  title={'Historial por dia'}
                />
                <ItemCard
                  path={'/HistoricoVentasMes'}
                  logo={LogoHistorialMes}
                  title={'Historial por mes'}
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
              </div>
            </>
          )
          :
          (
            <>
              <div className="grid grid-cols-4 gap-4">
                <ItemCard path={'/TerminalPV'}
                  logo={LogoVentas}
                  title={'Ventas'}
                />
                <ItemCard
                  path={'/Ventas'}
                  logo={LogoHistorial}
                  title={'Historial general'}
                />
                <ItemCard
                  path={'/HistoricoVentasDia'}
                  logo={LogoHistorialDia}
                  title={'Historial por dia'}
                />
                <ItemCard
                  path={'/HistoricoVentasMes'}
                  logo={LogoHistorialMes}
                  title={'Historial por mes'}
                />
              </div>
            </>
          )
      }
    </>
  )
}

export default Dashboard