                var objRuleta;
                var winningSegment;
                var distnaciaX = 150;
                var distnaciaY = 0;
                var ctx;
                function Mensaje() {
                    winningSegment = objRuleta.getIndicatedSegment();
                    swal({
                        title: " ¡ " + winningSegment.text + " !",

                        // imageUrl: "img/Matrice.png",
                        showCancelButton: true,
                        confirmButtonColor: "transparent",
                        confirmButtonText: "Reiniciar",
                        cancelButtonText: "Quitar elemento",
                        closeOnConfirm: true,
                        closeOnCancel: true
                    },
                        function (isConfirm) {
                            if (isConfirm) {

                            } else {

                                $('#ListaElementos').val($('#ListaElementos').val().replace(winningSegment.text, ""));
                                leerElementos();

                            }
                            objRuleta.stopAnimation(false);
                            objRuleta.rotationAngle = 0;
                            objRuleta.draw();
                            DibujarTriangulo();
                            bigButton.disabled = false;
                        });

                }

                function DibujarTriangulo() {
                    distnaciaX = 150;
                    distnaciaY = 20;
                    ctx = objRuleta.ctx;
                    ctx.strokeStyle = '#000000';
                    ctx.fillStyle = '#FFFF';
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.moveTo(distnaciaX + 170, distnaciaY + 5);
                    ctx.lineTo(distnaciaX + 230, distnaciaY + 5);
                    ctx.lineTo(distnaciaX + 200, distnaciaY + 40);
                    ctx.lineTo(distnaciaX + 171, distnaciaY + 5);
                    ctx.stroke();
                    ctx.fill();
                }

                function DibujarRuleta(ArregloElementos) {

                    objRuleta = new Winwheel({
                        'canvasId': 'Ruleta',
                        'numSegments': ArregloElementos.length,
                        'outerRadius': 220,
                        'innerRadius': 30,
                        'segments': ArregloElementos,
                        'animation':
                        {
                            'type': 'spinToStop',
                            'duration': 4,
                            'spins': 15,
                            'callbackFinished': 'Mensaje()',
                            'callbackAfter': 'DibujarTriangulo()'

                        },

                    });

                    DibujarTriangulo();
                }
                function leerElementos() {
                    txtListaElementos = $('#ListaElementos').val().trim();
                    var Elementos = txtListaElementos.split('\n');
                    var ElementosRuleta = [];
                    Elementos.forEach(function (Elemento) {
                        if (Elemento) {
                            ElementosRuleta.push({ 'fillStyle': "#" + ((1 << 24) * Math.random() | 0).toString(16), 'text': Elemento });
                        }
                    });
                    DibujarRuleta(ElementosRuleta);
                }
                leerElementos();