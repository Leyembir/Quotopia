#Generates a base layer for lambda functions

#Remove the container if it exists
docker rm layer-container

#build the base layer
docker build -t base-layer .

#Rename the container to layer-container
docker run --name layer-container base-layer

#Copy the layer to CDK
docker cp layer-container:/layer.zip . && echo "Created Layer.zip with updated base layer"