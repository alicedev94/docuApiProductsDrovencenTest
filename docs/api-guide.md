# Guía de API

Esta guía documenta los endpoints disponibles en nuestra API.

## Autenticación

Para acceder a los endpoints de la API, es necesario autenticarse primero. La autenticación se realiza mediante JSON-RPC.

### Detalles de Autenticación

```python
import requests
import json

def odoo_login():
    """Realiza la autenticación en Odoo mediante JSON-RPC."""
    # URL de autenticación
    login_url = "http://your-instance.com/web/session/authenticate"
    
    # Datos de autenticación
    payload = {
        "jsonrpc": "2.0",
        "params": {
            "db": "your-databse.db",
            "login": "tu_usuario",
            "password": "tu_contraseña"
        }
    }
    
    headers = {"Content-Type": "application/json"}
    
    # Realizar la petición de login
    response = requests.post(login_url, data=json.dumps(payload), headers=headers)
    response.raise_for_status()
    
    # Verificar si el login fue exitoso
    if response.json().get("result", {}).get("uid"):
        print("🎉 ¡Login exitoso!")
        return True
    else:
        error_message = response.json().get('error', {}).get('message', 'Error de autenticación desconocido')
        print(f"❌ Error de autenticación: {error_message}")
        return False
```

::: warning
⚠️ Importante: 
- Reemplaza `tu_usuario` y `tu_contraseña` con tus credenciales reales
- Mantén tus credenciales seguras y nunca las compartas
- No incluyas las credenciales directamente en el código
:::

### Manejo de Sesión

Una vez autenticado, la sesión se mantiene mediante cookies. Es recomendable:

1. Crear una sesión persistente:
```python
session = requests.Session()
```

2. Usar la misma sesión para todas las peticiones posteriores:
```python
# Ejemplo de uso de la sesión
response = session.get("http://localhost:8089/api/v1/products")
```

::: tip
Para mantener la seguridad, asegúrate de:
- Usar HTTPS para todas las comunicaciones
- No almacenar las credenciales en el código fuente
- Implementar un manejo adecuado de errores de autenticación
:::

## Endpoints

### Productos

#### Obtener Lista de Productos

```http
GET http://localhost:8089/api/v1/products
```

**Parámetros de Consulta**

| Parámetro | Tipo | Descripción | Requerido |
|-----------|------|-------------|-----------|
| limit | integer | Número máximo de productos a retornar | No |
| offset | integer | Número de productos a saltar | No |
| default_code | string | Código interno del producto para filtrar | No |

**Ejemplos de Uso**

1. Paginación básica:
```http
GET http://localhost:8089/api/v1/products?limit=1&offset=0
```

2. Búsqueda por código interno:
```http
GET http://localhost:8089/api/v1/products?default_code=10007
```

**Respuesta Exitosa**

```json
{
  "products": [
    {
      "id": 00001,
      "name": "EJEMPLO MASCARA DE OXIGENO",
      "default_code": "000000000001",
      "inventory_available_quantity": 10.0,
      "barcode": "7000000000001",
      "base_price_company_currency": 25.80,
      "price_after_pricelist_company_currency": 34.08,
      "final_price_company_currency": 34.08,
      "final_price_usd": 0.25,
      "final_price_ves": 34.08,
      "company_currency_code": "VES",
      "expiration_dates_by_lot": [
        {
          "lot_name": "L00001",
          "expiration_date": "2028-01-01",
          "quantity_in_lot": 10.0
        }
      ]
    }
  ]
}
```

**Descripción de Campos**

- `id`: Identificador único del producto
- `name`: Nombre del producto
- `default_code`: Código interno del producto
- `inventory_available_quantity`: Cantidad disponible en inventario
- `barcode`: Código de barras del producto
- `base_price_company_currency`: Precio base en la moneda de la compañía
- `price_after_pricelist_company_currency`: Precio después de aplicar la lista de precios
- `final_price_company_currency`: Precio final en la moneda de la compañía
- `final_price_usd`: Precio final en USD
- `final_price_ves`: Precio final en VES
- `company_currency_code`: Código de la moneda de la compañía
- `expiration_dates_by_lot`: Array con información de lotes y fechas de expiración
  - `lot_name`: Nombre del lote
  - `expiration_date`: Fecha de expiración
  - `quantity_in_lot`: Cantidad en el lote

**Códigos de Estado**

- `200 OK`: La solicitud fue exitosa
- `401 Unauthorized`: No autorizado
- `500 Internal Server Error`: Error del servidor

## Ejemplos de Uso

### Ejemplo con Python

```python
import requests
import json

def get_products():
    """Obtiene todos los productos de la API."""
    try:
        # URL de la API
        api_url = "http://localhost:8089/api/v1/products"
        
        # Realizar la petición GET
        response = requests.get(api_url)
        response.raise_for_status()
        
        # Intentar decodificar la respuesta JSON
        try:
            return response.json()
        except json.decoder.JSONDecodeError:
            print("⚠️ La respuesta de la API no es un JSON válido. Mostrando texto plano.")
            return response.text
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Error al obtener productos: {e}")
        if response is not None:
            print(f"Detalles del error (si están disponibles): {response.text}")
    return None

# Ejemplo de uso
productos = get_products()
if productos:
    print(json.dumps(productos, indent=2, ensure_ascii=False))
```

