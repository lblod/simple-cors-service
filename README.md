# simple-cors-service

Simple CORS service experiment for dev purpose.

## How to

Add this to your docker-compose.dev.yml:

```yaml
cors:
  image: lblod/simple-cors-service
```

Add this to your dispatcher config:

```elixir
  match "/communica/*path"  do
    forward conn, path, "http://cors/"
  end
```

## Usage

```
http://localhost/communica/?url=https://www.provincieantwerpen.be/content/dam/publicaties/open-data/provincieraad/2024/2024-01-25/pr_2024-01-25.html
```
