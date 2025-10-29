Increased Docker Desktop resources :
CPU 8
Memory 16Gb
Swap 3Gb

% sudo vi /etc/hosts

% cd apim+am
% mkdir apim-4.6.5-am-4.6.3
% unzip apim+am.zip path/apim+am/apim-4.6.5-am-4.6.3
% export APIM_VERSION=4.8.9
% export AM_VERSION=4.8.3
% docker-compose up